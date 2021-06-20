from elasticsearch import Elasticsearch
import lib_file
#import os, time
#from tqdm import tqdm

es = Elasticsearch([{'host':'localhost','port':9200}])

ses = lib_file.SignatureES(es)

def get_file_list(root_dir):
    file_list = []
    counter = 1
    for root, directories, filenames in os.walk(root_dir):
        for filename in filenames:
            file_list.append(os.path.join(root, filename))
            counter += 1
    return file_list


root_dir = 'France Stamps'
filenames = sorted(get_file_list(root_dir))

filenames = [filename.replace('\\', '/') for filename in filenames]

for i in tqdm(range(len(filenames))):
    ses.add_image(filenames[i])


# Helper function to get the classname
def classname(str):
    filename =  str.split('/')[-1].split('.')[-2]
    return re.findall(r"[^\W\d_]+|\d+", filename)[0]

# Helper function to get the classname and filename
def classname_filename(str):
    return str.split('/')[-2] + '/' + str.split('/')[-1]

# Helper functions to plot the nearest images given a query image
def plot_images(filenames, distances):
    images = []
    for filename in filenames:
        images.append(mpimg.imread(filename))
    plt.figure(figsize=(20, 10))
    columns = 4
    for i, image in enumerate(images):
        ax = plt.subplot(len(images) / columns + 1, columns, i + 1)
        if i == 0:
            ax.set_title("Query Image\n" + classname_filename(filenames[i]))
        else:
            ax.set_title("Similar Image\n" + classname_filename(filenames[i]) +
                         "\nDistance: " +
                         str(float("{0:.2f}".format(distances[i]))))
        plt.imshow(image)

ranked_results = ses.search_image(filenames[29])

print("Query: ", ranked_results[0]["path"])
print("Results: ")
for result in ranked_results[1:]:
    print(result)



#result_images = []
#result_scores = []

#for result in ranked_results[1:]:
#    result_images.append(result['path'])
#    result_scores.append(float(result['dist']))


#plot_images(result_images, result_scores)

#es.indices.delete('images', ignore=[400, 404])
#es.indices.exists('images')
