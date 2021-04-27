import React from "react";
import { Form } from "react-bootstrap";

const CountryCodes = (props) => {
  return (
    <Form.Control
      placeholder="country code"
      className="auth-select"
      as="select"
      name="countryCode"
      style={{fontSize:"10px"}}
      onChange={props.onChange}
      required
    >
      <option id="971" value="+971">
        United Arab Emirates +971
      </option>

      <option id="966" value="+966">
        Saudi Arabia +966
      </option>

      <option id="93" value="+93">
        Afghanistan +93
      </option>

      <option id="355" value="+355">
        Albania +355
      </option>

      <option id="213" value="+213">
        Algeria +213
      </option>

      <option id="1684" value="+1684">
        AmericanSamoa +1684
      </option>

      <option id="376" value="+376">
        Netherlands Antilles +599
      </option>

      <option id="244" value="+244">
        Angola +244
      </option>

      <option id="1264" value="+1264">
        Anguilla +1264
      </option>

      <option id="672" value="+672">
        Antarctica +672
      </option>

      <option id="1268" value="+1268">
        Antigua and Barbuda +1268
      </option>

      <option id="54" value="+54">
        Argentina +54
      </option>

      <option id="374" value="+374">
        Armenia +374
      </option>

      <option id="297" value="+297">
        Aruba +297
      </option>

      <option id="61" value="+61">
        Australia +61
      </option>

      <option id="43" value="+43">
        Austria +43
      </option>

      <option id="994" value="+994">
        Azerbaijan +994
      </option>

      <option id="1242" value="+1242">
        Bahamas +1242
      </option>

      <option id="973" value="+973">
        Bahrain +973
      </option>

      <option id="880" value="+880">
        Bangladesh +880
      </option>

      <option id="1246" value="+1246">
        Barbados +1246
      </option>

      <option id="375" value="+375">
        Belarus +375
      </option>

      <option id="32" value="+32">
        Belgium +32
      </option>

      <option id="501" value="+501">
        Belize +501
      </option>

      <option id="229" value="+229">
        Benin +229
      </option>

      <option id="1441" value="+1441">
        Bermuda +1441
      </option>

      <option id="975" value="+975">
        Bhutan +975
      </option>

      <option id="591" value="+591">
        Bolivia, Plurinational State of +591
      </option>

      <option id="387" value="+387">
        Bosnia and Herzegovina +387
      </option>

      <option id="267" value="+267">
        Botswana +267
      </option>

      <option id="47" value="+47">
        Bouvet Island +47
      </option>

      <option id="55" value="+55">
        Brazil +55
      </option>

      <option id="246" value="+246">
        British Indian Ocean Territory +246
      </option>

      <option id="673" value="+673">
        Brunei +673
      </option>

      <option id="359" value="+359">
        Bulgaria +359
      </option>

      <option id="226" value="+226">
        Burkina Faso +226
      </option>

      <option id="257" value="+257">
        Burundi +257
      </option>

      <option id="855" value="+855">
        Cambodia +855
      </option>

      <option id="237" value="+237">
        Cameroon +237
      </option>

      <option id="1" value="+1">
        Canada +1
      </option>

      <option id="238" value="+238">
        Cape Verde +238
      </option>

      <option id="345" value="+345">
        Cayman Islands +345
      </option>

      <option id="236" value="+236">
        Central African Republic +236
      </option>

      <option id="235" value="+235">
        Chad +235
      </option>

      <option id="56" value="+56">
        Chile +56
      </option>

      <option id="86" value="+86">
        China +86
      </option>

      <option id="61" value="+61">
        Christmas Island +61
      </option>

      <option id="61" value="+61">
        Cocos (Keeling) Islands +61
      </option>

      <option id="57" value="+57">
        Colombia +57
      </option>

      <option id="269" value="+269">
        Comoros +269
      </option>

      <option id="242" value="+242">
        Congo - Brazzaville +242
      </option>

      <option id="243" value="+243">
        Congo - Kinshasa +243
      </option>

      <option id="682" value="+682">
        Cook Islands +682
      </option>

      <option id="506" value="+506">
        Costa Rica +506
      </option>

      <option id="225" value="+225">
        Cote d'Ivoire +225
      </option>

      <option id="385" value="+385">
        Croatia +385
      </option>

      <option id="53" value="+53">
        Cuba +53
      </option>

      <option id="357" value="+357">
        Cyprus +357
      </option>

      <option id="420" value="+420">
        Czech Republic +420
      </option>

      <option id="45" value="+45">
        Denmark +45
      </option>

      <option id="253" value="+253">
        Djibouti +253
      </option>

      <option id="1767" value="+1767">
        Dominica +1767
      </option>

      <option id="1849" value="+1849">
        Dominican Republic +1849
      </option>

      <option id="593" value="+593">
        Ecuador +593
      </option>

      <option id="20" value="+20">
        Egypt +20
      </option>

      <option id="503" value="+503">
        El Salvador +503
      </option>

      <option id="240" value="+240">
        Equatorial Guinea +240
      </option>

      <option id="291" value="+291">
        Eritrea +291
      </option>

      <option id="372" value="+372">
        Estonia +372
      </option>

      <option id="251" value="+251">
        Ethiopia +251
      </option>

      <option id="500" value="+500">
        Falkland Islands (Malvinas) +500
      </option>

      <option id="298" value="+298">
        Faroe Islands +298
      </option>

      <option id="679" value="+679">
        Fiji +679
      </option>

      <option id="358" value="+358">
        Finland +358
      </option>

      <option id="33" value="+33">
        France +33
      </option>

      <option id="594" value="+594">
        French Guiana +594
      </option>

      <option id="689" value="+689">
        French Polynesia +689
      </option>

      <option id="241" value="+241">
        Gabon +241
      </option>

      <option id="220" value="+220">
        Gambia +220
      </option>

      <option id="995" value="+995">
        Georgia +995
      </option>

      <option id="49" value="+49">
        Germany +49
      </option>

      <option id="233" value="+233">
        Ghana +233
      </option>

      <option id="350" value="+350">
        Gibraltar +350
      </option>

      <option id="30" value="+30">
        Greece +30
      </option>

      <option id="299" value="+299">
        Greenland +299
      </option>

      <option id="1473" value="+1473">
        Grenada +1473
      </option>

      <option id="590" value="+590">
        Guadeloupe +590
      </option>

      <option id="1671" value="+1671">
        Guam +1671
      </option>

      <option id="502" value="+502">
        Guatemala +502
      </option>

      <option id="44" value="+44">
        Guernsey +44
      </option>

      <option id="224" value="+224">
        Guinea +224
      </option>

      <option id="245" value="+245">
        Guinea-Bissau +245
      </option>

      <option id="595" value="+595">
        Guyana +595
      </option>

      <option id="509" value="+509">
        Haiti +509
      </option>

      <option id="379" value="+379">
        Holy See (Vatican City State) +379
      </option>

      <option id="504" value="+504">
        Honduras +504
      </option>

      <option id="852" value="+852">
        Hong Kong +852
      </option>

      <option id="36" value="+36">
        Hungary +36
      </option>

      <option id="354" value="+354">
        Iceland +354
      </option>

      <option id="91" value="+91">
        India +91
      </option>

      <option id="62" value="+62">
        Indonesia +62
      </option>

      <option id="98" value="+98">
        Iran +98
      </option>

      <option id="964" value="+964">
        Iraq +964
      </option>

      <option id="353" value="+353">
        Ireland +353
      </option>

      <option id="44" value="+44">
        Isle of Man +44
      </option>

      <option id="972" value="+972">
        Israel +972
      </option>

      <option id="39" value="+39">
        Italy +39
      </option>

      <option id="1876" value="+1876">
        Jamaica +1876
      </option>

      <option id="81" value="+81">
        Japan +81
      </option>

      <option id="44" value="+44">
        Jersey +44
      </option>

      <option id="962" value="+962">
        Jordan +962
      </option>

      <option id="77" value="+77">
        Kazakhstan +77
      </option>

      <option id="254" value="+254">
        Kenya +254
      </option>

      <option id="686" value="+686">
        Kiribati +686
      </option>

      <option id="850" value="+850">
        North Korea +850
      </option>

      <option id="82" value="+82">
        South Korea +82
      </option>

      <option id="965" value="+965">
        Kuwait +965
      </option>

      <option id="996" value="+996">
        Kyrgyzstan +996
      </option>

      <option id="856" value="+856">
        Laos +856
      </option>

      <option id="371" value="+371">
        Latvia +371
      </option>

      <option id="961" value="+961">
        Lebanon +961
      </option>

      <option id="266" value="+266">
        Lesotho +266
      </option>

      <option id="231" value="+231">
        Liberia +231
      </option>

      <option id="218" value="+218">
        Libya +218
      </option>

      <option id="423" value="+423">
        Liechtenstein +423
      </option>

      <option id="370" value="+370">
        Lithuania +370
      </option>

      <option id="352" value="+352">
        Luxembourg +352
      </option>

      <option id="853" value="+853">
        Macao +853
      </option>

      <option id="389" value="+389">
        Macedonia +389
      </option>

      <option id="261" value="+261">
        Madagascar +261
      </option>

      <option id="265" value="+265">
        Malawi +265
      </option>

      <option id="60" value="+60">
        Malaysia +60
      </option>

      <option id="960" value="+960">
        Maldives +960
      </option>

      <option id="223" value="+223">
        Mali +223
      </option>

      <option id="356" value="+356">
        Malta +356
      </option>

      <option id="692" value="+692">
        Marshall Islands +692
      </option>

      <option id="596" value="+596">
        Martinique +596
      </option>

      <option id="222" value="+222">
        Mauritania +222
      </option>

      <option id="230" value="+230">
        Mauritius +230
      </option>

      <option id="262" value="+262">
        Mayotte +262
      </option>

      <option id="52" value="+52">
        Mexico +52
      </option>

      <option id="691" value="+691">
        Micronesia +691
      </option>

      <option id="373" value="+373">
        Moldova +373
      </option>

      <option id="377" value="+377">
        Monaco +377
      </option>

      <option id="976" value="+976">
        Mongolia +976
      </option>

      <option id="382" value="+382">
        Montenegro +382
      </option>

      <option id="166" value="+166">
        Montserrat +166
      </option>

      <option id="212" value="+212">
        Morocco +212
      </option>

      <option id="258" value="+258">
        Mozambique +258
      </option>

      <option id="95" value="+95">
        Myanmar +95
      </option>

      <option id="264" value="+264">
        Namibia +264
      </option>

      <option id="674" value="+674">
        Nauru +674
      </option>

      <option id="977" value="+977">
        Nepal +977
      </option>

      <option id="31" value="+31">
        Netherlands +31
      </option>

      <option id="599" value="+599">
        Netherlands Antilles +599
      </option>

      <option id="687" value="+687">
        New Caledonia +687
      </option>

      <option id="64" value="+64">
        New Zealand +64
      </option>

      <option id="505" value="+505">
        Nicaragua +505
      </option>

      <option id="227" value="+227">
        Niger +227
      </option>

      <option id="234" value="+234">
        Nigeria +234
      </option>

      <option id="683" value="+683">
        Niue +683
      </option>

      <option id="672" value="+672">
        Norfolk Island +672
      </option>

      <option id="1670" value="+1670">
        Northern Mariana Islands +1670
      </option>

      <option id="47" value="+47">
        Norway +47
      </option>

      <option id="968" value="+968">
        Oman +968
      </option>

      <option id="92" value="+92">
        Pakistan +92
      </option>

      <option id="680" value="+680">
        Palau +680
      </option>

      <option id="970" value="+970">
        Palestinian Territories +970
      </option>

      <option id="507" value="+507">
        Panama +507
      </option>

      <option id="675" value="+675">
        Papua New Guinea +675
      </option>

      <option id="595" value="+595">
        Paraguay +595
      </option>

      <option id="51" value="+51">
        Peru +51
      </option>

      <option id="63" value="+63">
        Philippines +63
      </option>

      <option id="872" value="+872">
        Pitcairn +872
      </option>

      <option id="48" value="+48">
        Poland +48
      </option>

      <option id="351" value="+351">
        Portugal +351
      </option>

      <option id="1939" value="+1939">
        Puerto Rico +1939
      </option>

      <option id="974" value="+974">
        Qatar +974
      </option>

      <option id="40" value="+40">
        Romania +40
      </option>

      <option id="7" value="+7">
        Russia +7
      </option>

      <option id="250" value="+250">
        Rwanda +250
      </option>

      <option id="262" value="+262">
        Reunion +262
      </option>

      <option id="590" value="+590">
        St. Barthelemy +590
      </option>

      <option id="290" value="+290">
        St. Helen +290
      </option>

      <option id="1869" value="+1869">
        St. Kitts and Nevis +1869
      </option>

      <option id="1758" value="+1758">
        St. Lucia +1758
      </option>

      <option id="590" value="+590">
        St. Martin +590
      </option>

      <option id="508" value="+508">
        St. Pierre and Miquelon +508
      </option>

      <option id="1784" value="+1784">
        St. Vincent and Grenadines +1784
      </option>

      <option id="685" value="+685">
        Samoa +685
      </option>

      <option id="378" value="+378">
        San Marino +378
      </option>

      <option id="239" value="+239">
        Sao Tome and Principe +239
      </option>

      <option id="221" value="+221">
        Senegal +221
      </option>

      <option id="381" value="+381">
        Serbia +381
      </option>

      <option id="248" value="+248">
        Seychelles +248
      </option>

      <option id="232" value="+232">
        Sierra Leone +232
      </option>

      <option id="65" value="+65">
        Singapore +65
      </option>

      <option id="421" value="+421">
        Slovakia +421
      </option>

      <option id="386" value="+386">
        Slovenia +386
      </option>

      <option id="677" value="+677">
        Solomon Islands +677
      </option>

      <option id="252" value="+252">
        Somalia +252
      </option>

      <option id="27" value="+27">
        South Africa +27
      </option>

      <option id="211" value="+211">
        South Sudan +211
      </option>

      <option id="500" value="+500">
        South Georgia and the South Sandwich Islands +500
      </option>

      <option id="34" value="+34">
        Spain +34
      </option>

      <option id="94" value="+94">
        Sri Lanka +94
      </option>

      <option id="249" value="+249">
        Sudan +249
      </option>

      <option id="597" value="+597">
        Suriname +597
      </option>

      <option id="47" value="+47">
        Svalbard and Jan Mayen +47
      </option>

      <option id="268" value="+268">
        Swaziland +268
      </option>

      <option id="46" value="+46">
        Sweden +46
      </option>

      <option id="41" value="+41">
        Switzerland +41
      </option>

      <option id="963" value="+963">
        Syrian Arab Republic +963
      </option>

      <option id="886" value="+886">
        Taiwan +886
      </option>

      <option id="992" value="+992">
        Tajikistan +992
      </option>

      <option id="255" value="+255">
        Tanzania +255
      </option>

      <option id="66" value="+66">
        Thailand +66
      </option>

      <option id="670" value="+670">
        Timor-Leste +670
      </option>

      <option id="228" value="+228">
        Togo +228
      </option>

      <option id="690" value="+690">
        Tokelau +690
      </option>

      <option id="676" value="+676">
        Tonga +676
      </option>

      <option id="186" value="+186">
        Trinidad and Tobago +186
      </option>

      <option id="216" value="+216">
        Tunisia +216
      </option>

      <option id="90" value="+90">
        Turkey +90
      </option>

      <option id="993" value="+993">
        Turkmenistan +993
      </option>

      <option id="164" value="+164">
        Turks and Caicos Islands +164
      </option>

      <option id="688" value="+688">
        Tuvalu +688
      </option>

      <option id="256" value="+256">
        Uganda +256
      </option>

      <option id="380" value="+380">
        Ukraine +380
      </option>

      <option id="44" value="+44">
        United Kingdom +44
      </option>

      <option id="1" value="+1">
        United States +1
      </option>

      <option id="598" value="+598">
        Uruguay +598
      </option>

      <option id="998" value="+998">
        Uzbekistan +998
      </option>

      <option id="678" value="+678">
        Vanuatu +678
      </option>

      <option id="58" value="+58">
        Venezuela +58
      </option>

      <option id="84" value="+84">
        Vietnam +84
      </option>

      <option id="128" value="+128">
        Virgin Islands, British +128
      </option>

      <option id="134" value="+134">
        Virgin Islands, U.S. +134
      </option>

      <option id="681" value="+681">
        Wallis and Futuna +681
      </option>

      <option id="967" value="+967">
        Yemen +967
      </option>

      <option id="260" value="+260">
        Zambia +260
      </option>

      <option id="263" value="+263">
        Zimbabwe +263
      </option>
    </Form.Control>
  );
};

export default CountryCodes;
