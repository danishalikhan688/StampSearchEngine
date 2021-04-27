from itertools import product
from operator import itemgetter

import numpy as np
from numpy.linalg import norm

from datetime import datetime
from collections import deque

from skimage.color import rgb2gray
from skimage.io import imread

import pickle
#from tqdm import tqdm, tqdm_notebook, notebook
from tqdm.notebook import tqdm

import os, time

import cv2
from PIL import Image, ImageChops
from six import string_types, text_type
from io import BytesIO
import xml.etree

from PIL.MpoImagePlugin import MpoImageFile
try:
    from cairosvg import svg2png
except ImportError:
    pass

from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.applications.resnet50 import ResNet50
from tensorflow.keras.applications.vgg16 import VGG16
from tensorflow.keras.applications.vgg19 import VGG19
from tensorflow.keras.applications.mobilenet import MobileNet
from tensorflow.keras.applications.inception_v3 import InceptionV3
from tensorflow.keras.applications.xception import Xception


from sklearn.decomposition import PCA
#from sklearn.neighbors import NearestNeighbors

import matplotlib.pyplot as plt
import matplotlib.image as mpimg

import re

#Show the plots as a cell within the Jupyter Notebooks
#%matplotlib inline
class CorruptImageError(RuntimeError):
    pass

class ImageSignature(object):
    """Image signature generator.
    Based on the method of Goldberg, et al. Available at http://www.cs.cmu.edu/~hcwong/Pdfs/icip02.ps
    """
    def __init__(self, model_name='resnet'):
        self.model = self._model_picker_(model_name)
        self.extensions = ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG']
        
    def _model_picker_(self, name):
        """Currently the supported models for feature extraction are:
        1. vgg16
        2. vgg19
        3. mobilenet
        4. inception
        5. resnet
        6. xception
        Specify the model name to load it using the name param.
        Args:
            name (str): model name to be used for signature generation.
        """
        if (name == 'vgg16'):
            model = VGG16(weights='imagenet',
                          include_top=False,
                          input_shape=(224, 224, 3),
                          pooling='max')
        elif (name == 'vgg19'):
            model = VGG19(weights='imagenet',
                          include_top=False,
                          input_shape=(224, 224, 3),
                          pooling='max')
        elif (name == 'mobilenet'):
            model = MobileNet(weights='imagenet',
                              include_top=False,
                              input_shape=(224, 224, 3),
                              pooling='max',
                              depth_multiplier=1,
                              alpha=1)
        elif (name == 'inception'):
            model = InceptionV3(weights='imagenet',
                                include_top=False,
                                input_shape=(224, 224, 3),
                                pooling='max')
        elif (name == 'resnet'):
            model = ResNet50(weights='imagenet',
                             include_top=False,
                             input_shape=(224, 224, 3),
                            pooling='max')
        elif (name == 'xception'):
            model = Xception(weights='imagenet',
                             include_top=False,
                             input_shape=(224, 224, 3),
                             pooling='max')
        else:
            print("Specified model not available")
   
        return model     
        
    def generate_signature(self, image_or_path, bytestream=False):
        """Loads an image, preprocess it, extract features using the model specified
        and returns the normalized features (signatures).
        Args:
            image_or_path(string or numpy.ndarray): image path, or image array
            bytestream (Optional[boolean]): will the image be passed as raw bytes?
                That is, is the 'path_or_image' argument an in-memory image?
                (default False)
        """
        if bytestream:
            try:
                img = Image.open(BytesIO(image_or_path))
            except IOError:
                # could be an svg, attempt to convert
                try:
                    img = Image.open(BytesIO(svg2png(image_or_path)))
                except (NameError, xml.etree.ElementTree.ParseError):
                    raise CorruptImageError()
            img = img.convert('RGB')
            
            return self._extract_features_(img)
        
        else:
            if any(ext in image_or_path for ext in self.extensions):
                img = Image.open(image_or_path).convert("RGB")
                
                return self._extract_features_(img)
            else:
                print("Unsupported extensions...")
                print("Supported extensions are: ", self.extensions)
                return None
        
    def _trim_(self, im):
        """Trim the black border of images/stamps.
        Args:
            im (numpy.ndarray): A PIL image instance.
        """
        bg = Image.new(im.mode, im.size, im.getpixel((0,0)))
        diff = ImageChops.difference(im, bg)
        diff = ImageChops.add(diff, diff, 2.0, -100)
        bbox = diff.getbbox()
        if bbox:
            return im.crop(bbox)

    def _extract_features_(self, im):
        """Extract features from a PIL image instance.
        Args:
            im (numpy.ndarray): A PIL image instance.
        """

        input_shape = (224, 224)
        #im = Image.open(img_path).convert("RGB")
        trimmed_im = self._trim_(im)

        img_array = np.array(trimmed_im)

        resized_img_array = cv2.resize(img_array, input_shape, interpolation = cv2.INTER_AREA)

        expanded_img_array = np.expand_dims(resized_img_array, axis=0)
        preprocessed_img = preprocess_input(expanded_img_array)

        features = self.model.predict(preprocessed_img)  
        
        flattened_features = features.flatten()
        normalized_features = flattened_features / norm(flattened_features)

        return normalized_features
    
    @staticmethod
    def normalized_distance(_a, _b):
        """Compute normalized distance between two points.
        Computes || b - a || / ( ||b|| + ||a||)
        Args:
            _a (numpy.ndarray): array of size m
            _b (numpy.ndarray): array of size m
        Returns:
            normalized distance between signatures (float)
        Examples:
            >>> a = gis.generate_signature('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg/687px-Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg')
            >>> b = gis.generate_signature('https://pixabay.com/static/uploads/photo/2012/11/28/08/56/mona-lisa-67506_960_720.jpg')
            >>> gis.normalized_distance(a, b)
            0.22095170140933634
        """
        b = _b.astype(int)
        a = _a.astype(int)
        norm_diff = np.linalg.norm(b - a)
        norm1 = np.linalg.norm(b)
        norm2 = np.linalg.norm(a)
        return norm_diff / (norm1 + norm2)

class SignatureDatabaseBase(object):
    """Base class for storing and searching image signatures in a database
    Note:
        Implement the methods search_single_record and insert_single_record
        in a derived class
    """

    def search_single_record(self, rec, pre_filter=None):
        """Search for a matching image record.
        Must be implemented by derived class.
        Args:
            rec (dict): an image record. Will be in the format returned by
                make_record
                For example, rec could have the form:
                {'path': 'https://pixabay.com/static/uploads/photo/2012/11/28/08/56/mona-lisa-67506_960_720.jpg',
                'signature': [0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0 ... ]
                'simple_word_0': 42252475,
                'simple_word_1': 23885671,
                'simple_word_10': 9967839,
                'simple_word_11': 4257902,
                'simple_word_12': 28651959,
                'simple_word_13': 33773597,
                'simple_word_14': 39331441,
                'simple_word_15': 39327300,
                'simple_word_16': 11337345,
                'simple_word_17': 9571961,
                'simple_word_18': 28697868,
                'simple_word_19': 14834907,
                'simple_word_2': 7434746,
                'simple_word_20': 37985525,
                'simple_word_21': 10753207,
                'simple_word_22': 9566120,
                ...
                'metadata': {'category': 'art'},
                }
                The number of simple words corresponds to the attribute N
            pre_filter (dict): a filter to be applied by the concrete implementation
                before applying the matching strategy
                For example:
                    { "term": {  "metadata.category": "art" } }
        Returns:
            a formatted list of dicts representing matches.
            For example, if three matches are found:
            [
            {'dist': 0.069116439263706961,
            'id': u'AVM37oZq0osmmAxpPvx7',
            'path': u'https://pixabay.com/static/uploads/photo/2012/11/28/08/56/mona-lisa-67506_960_720.jpg'},
            {'dist': 0.22484320805049718,
            'id': u'AVM37nMg0osmmAxpPvx6',
            'path': u'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg/687px-Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg'},
            {'dist': 0.42529792112113302,
            'id': u'AVM37p530osmmAxpPvx9',
            'metadata': {...},
            'path': u'https://c2.staticflickr.com/8/7158/6814444991_08d82de57e_z.jpg'}
            ]
            You can return any fields you like, but must include at least dist and id. Duplicate entries are ok,
            and they do not need to be sorted
        """
        raise NotImplementedError

    def insert_single_record(self, rec):
        """Insert an image record.
        Must be implemented by derived class.
        Args:
            rec (dict): an image record. Will be in the format returned by
                make_record
                For example, rec could have the form:
                {'path': 'https://pixabay.com/static/uploads/photo/2012/11/28/08/56/mona-lisa-67506_960_720.jpg',
                'signature': [0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0 ... ]
                'simple_word_0': 42252475,
                'simple_word_1': 23885671,
                'simple_word_10': 9967839,
                'simple_word_11': 4257902,
                'simple_word_12': 28651959,
                'simple_word_13': 33773597,
                'simple_word_14': 39331441,
                'simple_word_15': 39327300,
                'simple_word_16': 11337345,
                'simple_word_17': 9571961,
                'simple_word_18': 28697868,
                'simple_word_19': 14834907,
                'simple_word_2': 7434746,
                'simple_word_20': 37985525,
                'simple_word_21': 10753207,
                'simple_word_22': 9566120,
                ...
                'metadata': {...}
                }
                The number of simple words corresponds to the attribute N
        """
        raise NotImplementedError

    def __init__(self, k=16, N=63, distance_cutoff=0.30,
                *signature_args, **signature_kwargs):
        """Set up storage scheme for images
        Central to the speed of this approach is the transforming the image
        signature into something that can be speedily indexed and matched.
        In our case, that means splitting the image signature into N words
        of length k, then encoding those words as integers. The idea here is
        that integer indices are more efficient than array indices.
        For example, say your image signature is [0, 1, 2, 0, -1, -2, 0, 1] and
        k=3 and N=4. That means we want 4 words of length 3.  For this signa-
        ture, that gives us:
        [0, 1, 2]
        [2, 0, -1]
        [-1, -2, 0]
        [0, 1]
        Note that signature elements can be repeated, and any mismatch in length
        is chopped off in the last word (which will be padded with zeros). Since
        these numbers run from -2..2, there 5 possibilites.  Adding 2 to each word
        makes them strictly non-negative, then the quantity, and transforming to
        base-5 makes unique integers. For the first word:
        [0, 1, 2] + 2 = [2, 3, 4]
        [5**0, 5**1, 5**2] = [1, 5, 25]
        dot([2, 3, 4], [1, 5, 25]) = 2 + 15 + 100 = 117
        So the integer word is 117.  Storing all the integer words as different
        database columns or fields gives us the speedy lookup. In practice, word
        arrays are 'squeezed' to between -1..1 before encoding.
        Args:
            k (Optional[int]): the width of a word (default 16)
            N (Optional[int]): the number of words (default 63)
            distance_cutoff (Optional [float]): maximum image signature distance to
                be considered a match (default 0.45)
            *signature_args: Variable length argument list to pass to ImageSignature
            **signature_kwargs: Arbitrary keyword arguments to pass to ImageSignature
        """
        # Check integer inputs
        if type(k) is not int:
            raise TypeError('k should be an integer')
        if type(N) is not int:
            raise TypeError('N should be an integer')
            
        self.k = k
        self.N = N

        # Check float input
        if type(distance_cutoff) is not float:
            raise TypeError('distance_cutoff should be a float')
        if distance_cutoff < 0.:
            raise ValueError('distance_cutoff should be > 0 (got %r)' % distance_cutoff)

        self.distance_cutoff = distance_cutoff

        self.gis = ImageSignature()

    def add_image(self, path, img=None, bytestream=False, metadata=None, refresh_after=False):
        """Add a single image to the database
        Args:
            path (string): path or identifier for image. If img=None, then path is assumed to be
                a URL or filesystem path
            img (Optional[string]): usually raw image data. In this case, path will still be stored, but
                a signature will be generated from data in img. If bytestream is False, but img is
                not None, then img is assumed to be the URL or filesystem path. Thus, you can store
                image records with a different 'path' than the actual image location (default None)
            bytestream (Optional[boolean]): will the image be passed as raw bytes?
                That is, is the 'path_or_image' argument an in-memory image? If img is None but, this
                argument will be ignored.  If img is not None, and bytestream is False, then the behavior
                is as described in the explanation for the img argument
                (default False)
            metadata (Optional): any other information you want to include, can be nested (default None)
        """
        rec = make_record(path, self.gis, self.k, self.N, img=img, bytestream=bytestream, metadata=metadata)
        #print(rec)
        self.insert_single_record(rec, refresh_after=refresh_after)

    def search_image(self, path, all_orientations=False, bytestream=False, pre_filter=None, metadata=False):
        """Search a given image for the hits in the index.
        Args:
            path (string): path or image data. If bytestream=False, then path is assumed to be
                a URL or filesystem path. Otherwise, it's assumed to be raw image data
            all_orientations (Optional[boolean]): if True, search for all combinations of mirror
                images, rotations, and color inversions (default False)
            bytestream (Optional[boolean]): will the image be passed as raw bytes?
                That is, is the 'path_or_image' argument an in-memory image?
                (default False)
            pre_filter (Optional[dict]): filters list before applying the matching algorithm
                (default None)
            metadata (Optional[boolean]): should the image be search with metadata for more accurate hits.
        Returns:
            a formatted list of dicts representing unique matches, sorted by dist
            For example, if three matches are found:
            [
            {'dist': 0.069116439263706961,
            'id': u'AVM37oZq0osmmAxpPvx7',
            'path': u'https://pixabay.com/static/uploads/photo/2012/11/28/08/56/mona-lisa-67506_960_720.jpg'},
            {'dist': 0.22484320805049718,
            'id': u'AVM37nMg0osmmAxpPvx6',
            'path': u'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg/687px-Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg'},
            {'dist': 0.42529792112113302,
            'id': u'AVM37p530osmmAxpPvx9',
            'path': u'https://c2.staticflickr.com/8/7158/6814444991_08d82de57e_z.jpg'}
            ]
        """
        if bytestream:
            try:
                img = Image.open(BytesIO(path))
            except IOError:
                # could be an svg, attempt to convert
                try:
                    img = Image.open(BytesIO(svg2png(path)))
                except (NameError, xml.etree.ElementTree.ParseError):
                    raise CorruptImageError()
            img = img.convert('RGB')

            return self._extract_features_(img)

        else:
            if any(ext in path for ext in self.gis.extensions):
                img = Image.open(path).convert("RGB")
                
                if all_orientations:
                    # initialize an iterator of composed transformations
                    inversions = [lambda x: x, lambda x: -x]

                    mirrors = [lambda x: x, np.fliplr]

                    # an ugly solution for function composition
                    rotations = [lambda x: x,
                                np.rot90,
                                lambda x: np.rot90(x, 2),
                                lambda x: np.rot90(x, 3)]

                    # cartesian product of all possible orientations
                    orientations = product(inversions, rotations, mirrors)

                else:
                    # otherwise just use the identity transformation
                    orientations = [lambda x: x]

                # try for every possible combination of transformations; if all_orientations=False,
                # this will only take one iteration
                result = []

                orientations = set(np.ravel(list(orientations)))
                for transform in orientations:
                    # compose all functions and apply on signature
                    transformed_img = transform(img)

                    # generate the signature
                    #transformed_record = make_record(transformed_img, self.gis, self.k, self.N)
                    
                    record = dict()
                    record['path'] = path
                    
                    signature = self.gis._extract_features_(transformed_img)

                    record['signature'] = signature.tolist()

                    if metadata:
                        record['metadata'] = metadata

                    words = get_words(signature, self.k, self.N)
                    max_contrast(words)

                    words = words_to_int(words)

                    for i in range(self.N):
                        record[''.join(['simple_word_', str(i)])] = words[i].tolist()
                        
                    #print(record)


                    l = self.search_single_record(record, pre_filter=pre_filter)
                    result.extend(l)
                    
                ids = set()
                unique = []
                for item in result:
                    if item['id'] not in ids:
                        unique.append(item)
                        ids.add(item['id'])

                r = sorted(unique, key=itemgetter('dist'))
                return r

            else:
                print("Unsupported extensions...")
                print("Supported extensions are: ", self.gis.extensions)
                return None   

def make_record(path, gis, k, N, img=None, bytestream=False, metadata=None):
    """Makes a record suitable for database insertion.
    Note:
        This non-class version of make_record is provided for
        CPU pooling. Functions passed to worker processes must
        be picklable.
    Args:
        path (string): path or image data. If bytestream=False, then path is assumed to be
            a URL or filesystem path. Otherwise, it's assumed to be raw image data
        gis (ImageSignature): an instance of ImageSignature for generating the
            signature
        k (int): width of words for encoding
        N (int): number of words for encoding
        img (Optional[string]): usually raw image data. In this case, path will still be stored, but
            a signature will be generated from data in img. If bytestream is False, but img is
            not None, then img is assumed to be the URL or filesystem path. Thus, you can store
            image records with a different 'path' than the actual image location (default None)
        bytestream (Optional[boolean]): will the image be passed as raw bytes?
            That is, is the 'path_or_image' argument an in-memory image? If img is None but, this
            argument will be ignored.  If img is not None, and bytestream is False, then the behavior
            is as described in the explanation for the img argument
            (default False)
        metadata (Optional): any other information you want to include, can be nested (default None)
    Returns:
        An image record.
        For example:
        {'path': 'https://pixabay.com/static/uploads/photo/2012/11/28/08/56/mona-lisa-67506_960_720.jpg',
         'signature': [0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0 ... ]
         'simple_word_0': 42252475,
         'simple_word_1': 23885671,
         'simple_word_10': 9967839,
         'simple_word_11': 4257902,
         'simple_word_12': 28651959,
         'simple_word_13': 33773597,
         'simple_word_14': 39331441,
         'simple_word_15': 39327300,
         'simple_word_16': 11337345,
         'simple_word_17': 9571961,
         'simple_word_18': 28697868,
         'simple_word_19': 14834907,
         'simple_word_2': 7434746,
         'simple_word_20': 37985525,
         'simple_word_21': 10753207,
         'simple_word_22': 9566120,
         ...
         'metadata': {...}
         }
    """
    record = dict()
    record['path'] = path
    if img is not None:
        signature = gis.generate_signature(img, bytestream=bytestream)
    else:
        signature = gis.generate_signature(path)
        
    #num_feature_dimensions = 50
    #pca = PCA(n_components=num_feature_dimensions)
    #signature = signature.reshape(1, -1)
    #pca.fit(signature)
    #signature_compressed = pca.transform(signature)

    #record['signature'] = signature_compressed.tolist()
    record['signature'] = signature.tolist()

    if metadata:
        record['metadata'] = metadata

    words = get_words(signature, k, N)
    max_contrast(words)

    words = words_to_int(words)

    for i in range(N):
        record[''.join(['simple_word_', str(i)])] = words[i].tolist()

    return record


def get_words(array, k, N):
    """Gets N words of length k from an array.
    Words may overlap.
    For example, say your image signature is [0, 1, 2, 0, -1, -2, 0, 1] and
    k=3 and N=4. That means we want 4 words of length 3.  For this signature,
    that gives us:
    [0, 1, 2]
    [2, 0, -1]
    [-1, -2, 0]
    [0, 1]
    Args:
        array (numpy.ndarray): array to split into words
        k (int): word length
        N (int): number of words
    Returns:
        an array with N rows of length k
    """
    # generate starting positions of each word
    word_positions = np.linspace(0, array.shape[0],
                                 N, endpoint=False).astype('int')

    # check that inputs make sense
    if k > array.shape[0]:
        raise ValueError('Word length cannot be longer than array length')
    if word_positions.shape[0] > array.shape[0]:
        raise ValueError('Number of words cannot be more than array length')

    # create empty words array
    words = np.zeros((N, k)).astype('int8')

    for i, pos in enumerate(word_positions):
        if pos + k <= array.shape[0]:
            words[i] = array[pos:pos+k]
        else:
            temp = array[pos:].copy()
            temp.resize(k)
            words[i] = temp

    return words


def words_to_int(word_array):
    """Converts a simplified word to an integer
    Encodes a k-byte word to int (as those returned by max_contrast).
    First digit is least significant.
    Returns dot(word + 1, [1, 3, 9, 27 ...] ) for each word in word_array
    e.g.:
    [ -1, -1, -1] -> 0
    [ 0,   0,  0] -> 13
    [ 0,   1,  0] -> 16
    Args:
        word_array (numpy.ndarray): N x k array
    Returns:
        an array of integers of length N (the integer word encodings)
    """
    width = word_array.shape[1]

    # Three states (-1, 0, 1)
    coding_vector = 3**np.arange(width)

    # The 'plus one' here makes all digits positive, so that the
    # integer represntation is strictly non-negative and unique
    return np.dot(word_array + 1, coding_vector)


def max_contrast(array):
    """Sets all positive values to one and all negative values to -1.
    Needed for first pass lookup on word table.
    Args:
        array (numpy.ndarray): target array
    """
    array[array > 0] = 1
    array[array < 0] = -1

    return None


def normalized_distance(_target_array, _vec, nan_value=1.0):
    """Compute normalized distance to many points.
    Computes || vec - b || / ( ||vec|| + ||b||) for every b in target_array
    Args:
        _target_array (numpy.ndarray): N x m array
        _vec (numpy.ndarray): array of size m
        nan_value (Optional[float]): value to replace 0.0/0.0 = nan with
            (default 1.0, to take those featureless images out of contention)
    Returns:
        the normalized distance (float)
    """
    #target_array = _target_array.astype(int)
    #vec = _vec.astype(int)
    topvec = np.linalg.norm(_vec - _target_array, axis=1)
    norm1 = np.linalg.norm(_vec, axis=0)
    norm2 = np.linalg.norm(_target_array, axis=1)
    finvec = topvec / (norm1 + norm2)
    finvec[np.isnan(finvec)] = nan_value

    return finvec

class SignatureES(SignatureDatabaseBase):
    """Elasticsearch driver for image-match
    """

    def __init__(self, es, index='images', doc_type='image', timeout='10s', size=100,
                *args, **kwargs):
        """Extra setup for Elasticsearch
        Args:
            es (elasticsearch): an instance of the elasticsearch python driver
            index (Optional[string]): a name for the Elasticsearch index (default 'images')
            doc_type (Optional[string]): a name for the document time (default 'image')
            timeout (Optional[int]): how long to wait on an Elasticsearch query, in seconds (default 10)
            size (Optional[int]): maximum number of Elasticsearch results (default 100)
            *args (Optional): Variable length argument list to pass to base constructor
            **kwargs (Optional): Arbitrary keyword arguments to pass to base constructor
        Examples:
            >>> from elasticsearch import Elasticsearch
            >>> from image_match.elasticsearch_driver import SignatureES
            >>> es = Elasticsearch()
            >>> ses = SignatureES(es)
            >>> ses.add_image('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg/687px-Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg')
            >>> ses.search_image('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg/687px-Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg')
            [
            {'dist': 0.0,
            'id': u'AVM37nMg0osmmAxpPvx6',
            'path': u'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg/687px-Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg',
            'score': 0.28797293}
            ]
        """
        self.es = es
        self.index = index
        self.doc_type = doc_type
        self.timeout = timeout
        self.size = size

        super(SignatureES, self).__init__(k=16, N=63, *args, **kwargs)

    def search_single_record(self, rec, pre_filter=None):
        path = rec.pop('path')
        signature = rec.pop('signature')
        if 'metadata' in rec:
            rec.pop('metadata')

        # build the 'should' list
        should = [{'term': {word: rec[word]}} for word in rec]
        
        #print(should)
        
        body = {
            'query': {
                'bool': {'should': should}
            },
            '_source': {'excludes': ['simple_word_*']}
        }
        
        #print(body)

        if pre_filter is not None:
            body['query']['bool']['filter'] = pre_filter

        res = self.es.search(index=self.index,
                            doc_type=self.doc_type,
                            body=body,
                            size=self.size,
                            timeout=self.timeout)['hits']['hits']

        sigs = np.array([x['_source']['signature'] for x in res])

        if sigs.size == 0:
            return []

        dists = normalized_distance(sigs, np.array(signature))

        formatted_res = [{'id': x['_id'],
                        #'score': x['_score'],
                        #'metadata': x['_source'].get('metadata'),
                        'path': x['_source'].get('url', x['_source'].get('path'))}
                        for x in res]

        for i, row in enumerate(formatted_res):
            row['dist'] = dists[i]
        formatted_res = filter(lambda y: y['dist'] < self.distance_cutoff, formatted_res)

        return formatted_res

    def insert_single_record(self, rec, refresh_after=False):
        rec['timestamp'] = datetime.now()
        self.es.index(index=self.index, doc_type=self.doc_type, body=rec, refresh=refresh_after)

    def delete_duplicates(self, path):
        """Delete all but one entries in elasticsearch whose `path` value is equivalent to that of path.
        Args:
            path (string): path value to compare to those in the elastic search
        """
        matching_paths = [item['_id'] for item in
                        self.es.search(body={'query':
                                            {'match':
                                                {'path': path}
                                            }
                                            },
                                        index=self.index)['hits']['hits']
                        if item['_source']['path'] == path]
        if len(matching_paths) > 0:
            for id_tag in matching_paths[1:]:
                self.es.delete(index=self.index, doc_type=self.doc_type, id=id_tag)
