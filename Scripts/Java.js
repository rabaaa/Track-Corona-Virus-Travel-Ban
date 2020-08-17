
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    currCountry = inp.value;
                    var part1 = namesToCodes[currCountry.toLowerCase()];
                    //console.log(part1);
                    if (part1 == null) {
                        console.log("uh oh, code was not found for the name " + currCountry);
                        bannedCountries = [];
                        console.log(currCountry);
                        populateBanText("EMPTY");
                        createLabels([currCountry]);
                    }
                    else {
                        //console.log("set banned countries to dict value");
                        bannedCountries = bansByCode[namesToCodes[currCountry.toLowerCase()].toUpperCase()] || [];
                        //console.log(bannedCountries);
                        populateBanText(part1);
                        var temp = [currCountry];
                        for (element of bannedCountries) {
                            temp.push(element);
                        }
                        createLabels(temp);
   

                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

// Variable declaration and initiation of globe
var countriesString = "Fiji,Tanzania,W. Sahara,Canada,United States of America,Kazakhstan,Uzbekistan,Papua New Guinea,Indonesia,Argentina,Chile,Dem. Rep. Congo,Somalia,Kenya,Sudan,Chad,Haiti,Dominican Rep.,Russia,Bahamas,Falkland Is.,Norway,Greenland,Fr. S. Antarctic Lands,Timor-Leste,South Africa,Lesotho,Mexico,Uruguay,Brazil,Bolivia,Peru,Colombia,Panama,Costa Rica,Nicaragua,Honduras,El Salvador,Guatemala,Belize,Venezuela,Guyana,Suriname,France,Ecuador,Puerto Rico,Jamaica,Cuba,Zimbabwe,Botswana,Namibia,Senegal,Mali,Mauritania,Benin,Niger,Nigeria,Cameroon,Togo,Ghana,Côte d'Ivoire,Guinea,Guinea-Bissau,Liberia,Sierra Leone,Burkina Faso,Central African Rep.,Congo,Gabon,Eq. Guinea,Zambia,Malawi,Mozambique,eSwatini,Angola,Burundi,Israel,Lebanon,Madagascar,Palestine,Gambia,Tunisia,Algeria,Jordan,United Arab Emirates,Qatar,Kuwait,Iraq,Oman,Vanuatu,Cambodia,Thailand,Laos,Myanmar,Vietnam,North Korea,South Korea,Mongolia,India,Bangladesh,Bhutan,Nepal,Pakistan,Afghanistan,Tajikistan,Kyrgyzstan,Turkmenistan,Iran,Syria,Armenia,Sweden,Belarus,Ukraine,Poland,Austria,Hungary,Moldova,Romania,Lithuania,Latvia,Estonia,Germany,Bulgaria,Greece,Turkey,Albania,Croatia,Switzerland,Luxembourg,Belgium,Netherlands,Portugal,Spain,Ireland,New Caledonia,Solomon Is.,New Zealand,Australia,Sri Lanka,China,Taiwan,Italy,Denmark,United Kingdom,Iceland,Azerbaijan,Georgia,Philippines,Malaysia,Brunei,Slovenia,Finland,Slovakia,Czechia,Eritrea,Japan,Paraguay,Yemen,Saudi Arabia,Antarctica,N. Cyprus,Cyprus,Morocco,Egypt,Libya,Ethiopia,Djibouti,Somaliland,Uganda,Rwanda,Bosnia and Herz.,Macedonia,Serbia,Montenegro,Kosovo,Trinidad and Tobago,S. Sudan";
var countriesList = countriesString.split(",");
var canvas = document.getElementById('globe');
var currCountry = ""; //holds the name of the highlighted country for the highlighter plugin
var bannedCountries = []; //holds all banned countries for the highlighter plugin
var bansByCode = { "AZ": ["China", "Bahrain", "Indonesia", "Iran", "Israel", "Japan", "Korea", "Kuwait", "Malaysia", "Oman", "Qatar", "Singapore"], "AO": ["China", "France", "Iran", "Italy", "Korea", "Portugal", "Spain", "China", "France", "Iran", "Italy", "Korea", "Portugal", "Spain"], "FK": ["China", "Iran", "Italy", "Korea"], "AU": ["Fiji", "Guinea", "Samoa", "Tonga"], "BZ": ["China", "Iran", "Japan", "Korea", "China", "Iran", "Japan", "Korea", "China", "Iran", "Japan", "Korea", "China", "Iran", "Japan", "Korea"], "CD": ["Congo"], "ID": ["China", "France", "Germany", "Iran", "Italy", "Korea", "Spain", "Switzerland"], "MP": ["Guam"], "AG": ["Austria", "Belgium", "Bulgaria", "China", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Iran", "Ireland", "Italy", "Korea", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Singapore", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland"], "BW": ["Austria", "Belgium", "China", "Denmark", "France", "Germany", "India", "Iran", "Italy", "Japan", "Korea", "Netherlands", "Norway", "Spain", "Sweden", "Switzerland", "Austria", "Belgium", "China", "Denmark", "France", "Germany", "India", "Iran", "Italy", "Japan", "Korea", "Netherlands", "Norway", "Spain", "Sweden", "Switzerland"], "FR": ["Switzerland", "Switzerland"], "MN": ["China"], "GA": ["Austria", "Belgium", "Bulgaria", "China", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Italy", "Ireland", "Korea", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Spain", "Slovakia", "Slovenia", "Sweden", "Switzerland"], "KR": ["Korea", "China", "Korea", "China", "Korea", "Korea", "Albania", "Andorra", "Barbados", "Dominica", "Guyana", "Ireland", "Korea", "Malta", "Mexico", "Monaco", "Nicaragua", "Slovenia", "Korea"], "MR": ["Mauritius", "Mauritius"], "BG": ["Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "Greece", "Hungary", "Latvia", "Lithuania", "Malta", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Sweden", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "Greece", "Hungary", "Latvia", "Lithuania", "Malta", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "Greece", "Hungary", "Latvia", "Lithuania", "Malta", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Austria", "Belgium", "France", "Germany", "Iceland", "Ireland", "Italy", "Liechtenstein", "Luxembourg", "Netherlands", "Spain", "Switzerland", "Turkey", "Macedonia", "Serbia", "Montenegro", "Italy"], "IR": ["China"], "JP": ["Albania", "Armenia", "Australia", "Bahrain", "Bolivia", "Brazil", "Brunei", "Bulgaria", "Chile", "China", "Congo", "Croatia", "Cyprus", "Dominica", "Ecuador", "Egypt", "Finland", "Greece", "Hungary", "Israel", "Indonesia", "Korea", "Latvia", "Lithuania", "Malaysia", "Mauritius", "Moldova", "Morocco", "Montenegro", "Macedonia", "Panama", "Philippines", "Poland", "Romania", "Serbia", "Singapore", "Slovakia", "Thailand", "Turkey", "Albania", "Andorra", "Armenia", "Australia", "Austria", "Bahrain", "Belgium", "Bolivia", "Brazil", "Brunei", "Bulgaria", "China", "Chile", "Congo", "Croatia", "Cyprus", "Denmark", "Dominica", "Ecuador", "Egypt", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Indonesia", "Iran", "Ireland", "Israel", "Italy", "Korea", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Mauritius", "Monaco", "Montenegro", "Malaysia", "Moldova", "Morocco", "Macedonia", "Norway", "Panama", "Philippines", "Poland", "Portugal", "Romania", "Serbia", "Singapore", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Thailand", "Turkey", "Andorra", "Austria", "Belgium", "Denmark", "Estonia", "France", "Germany", "Iceland", "Iran", "Ireland", "Italy", "Liechtenstein", "Luxembourg", "Malta", "Monaco", "Netherlands", "Norway", "Portugal", "Slovenia", "Spain", "Sweden", "Switzerland", "Albania", "Armenia", "Australia", "Bahrain", "Bolivia", "Brazil", "Brunei", "Bulgaria", "Chile", "China", "Congo", "Croatia", "Cyprus", "Dominica", "Ecuador", "Egypt", "Finland", "Greece", "Hungary", "Korea", "Israel", "Indonesia", "Latvia", "Lithuania", "Malaysia", "Mauritius", "Moldova", "Morocco", "Montenegro", "Macedonia", "Panama", "Philippines", "Singapore", "Slovakia", "Serbia", "Thailand", "Poland", "Romania", "Turkey", "Andorra", "Argentina", "Austria", "Bahamas", "Barbados", "Belgium", "Brunei", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Guatemala", "Honduras", "Hungary", "Iceland", "Indonesia", "Iran", "Ireland", "Israel", "Italy", "Korea", "Latvia", "Lesotho", "Liechtenstein", "Lithuania", "Luxembourg", "Malaysia", "Malta", "Mexico", "Monaco", "Netherlands", "Norway", "Peru", "Poland", "Portugal", "Romania", "Singapore", "Slovakia", "Slovenia", "Spain", "Suriname", "Sweden", "Switzerland", "Thailand", "Tunisia", "Uruguay", "Azerbaijan", "Bangladesh", "Cambodia"], "IS": ["Switzerland"], "PH": ["China", "Korea", "Iran", "Italy", "Iran", "Italy"], "KM": ["China", "Egypt", "France", "Iran", "Italy", "Morocco", "Spain", "Tunisia"], "WS": ["Georgia", "Tonga"], "VN": ["Vietnam", "Vietnam", "Italy", "Korea", "Denmark", "Finland", "France", "Germany", "Norway", "Spain", "Sweden", "China", "Denmark", "Finland", "France", "Germany", "Iran", "Italy", "Korea", "Norway", "Spain", "Sweden", "Belarus", "Japan", "Belarus", "Japan"], "EE": ["Latvia"], "KI": ["Australia", "China", "Egypt", "France", "Germany", "Italy", "Japan", "Korea", "Malaysia", "Singapore", "Spain", "Thailand"], "MO": ["Iran", "Italy", "Korea"], "ME": ["China", "Iran", "Italy", "Korea", "Spain"], "NR": ["China", "Italy", "Korea"], "PG": ["China", "Iran", "Italy", "Japan", "Korea"], "NU": ["Australia", "Austria", "Belgium", "Bulgaria", "China", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Indonesia", "Iran", "Italy", "Japan", "Korea", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Singapore", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Thailand"], "OM": ["Bahrain", "Kuwait", "Qatar", "Bahrain", "Kuwait", "Qatar"], "PW": ["China"], "PT": ["Angola", "Austria", "Belgium", "Brazil", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Mozambique", "Netherlands", "Norway", "Poland", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland"], "TJ": ["Afghanistan", "China", "Iran", "Italy", "Korea"], "GR": ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Germany", "Italy", "Netherlands", "Spain"], "BE": ["Switzerland", "Switzerland", "Andorra", "Monaco", "Montenegro", "Macedonia", "Serbia", "Switzerland", "Switzerland"], "SG": ["Brunei", "Cambodia", "France", "India", "Indonesia", "Malaysia", "Philippines", "Switzerland", "Thailand", "Brunei", "Cambodia", "France", "India", "Indonesia", "Malaysia", "Philippines", "Switzerland", "Thailand"], "SL": ["China"], "SO": ["China", "China"], "TW": ["China"], "UY": ["Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Paraguay", "Peru", "Venezuela"], "VC": ["China", "Japan", "Korea", "Singapore"], "BD": ["Bahrain", "Bhutan", "India", "Kuwait", "Malaysia", "Maldives", "Oman", "Qatar", "Singapore", "Thailand", "Turkey", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Iran", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Iran", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Iran"], "KW": ["China", "Egypt", "France", "Germany", "Iran", "Iraq", "Italy", "Korea", "Spain", "China", "Egypt", "France", "Germany", "Iran", "Iraq", "Italy", "Korea", "Spain"], "AT": ["Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland"], "BH": ["Austria", "Belgium", "China", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Iran", "Iraq", "Korea", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Kuwait", "Oman", "Qatar", "Italy", "Japan", "Lebanon", "Malaysia", "Singapore", "Thailand", "Kuwait", "Oman", "Qatar", "Kuwait", "Oman", "Qatar", "Austria", "Belgium", "China", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Iran", "Iraq", "Italy", "Japan", "Korea", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Malaysia", "Netherlands", "Norway", "Poland", "Portugal", "Singapore", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Thailand", "China", "Egypt", "Iran", "Iraq", "Italy", "Japan", "Korea", "Lebanon", "Malaysia", "Singapore", "Thailand"], "MV": ["Bangladesh", "China", "Iran", "Italy", "Malaysia", "Spain", "Korea"], "BQ": ["Austria", "Belgium", "Bulgaria", "China", "Colombia", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Iran", "Ireland", "Italy", "Korea", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland"], "FI": ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland"], "CN": ["France", "Germany", "Iran", "Italy", "Japan", "Korea", "Spain"], "TO": ["China", "China"], "RS": ["Austria", "France", "Germany", "Greece", "Iran", "Italy", "Romania", "Slovenia", "Spain", "Austria", "France", "Germany", "Greece", "Iran", "Italy", "Romania", "Slovenia", "Spain", "Switzerland"], "HK": ["China", "China", "China", "China", "China", "China", "China", "China", "China", "China", "China", "China"], "NZ": ["Australia", "Samoa", "Tonga"], "GI": ["Spain", "Spain"], "KH": ["France", "Germany", "Iran", "Italy", "Spain", "France", "Germany", "Iran", "Italy", "Spain"], "NO": ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"], "TR": ["Algeria", "Angola", "Austria", "Azerbaijan", "Bangladesh", "Belgium", "Bulgaria", "Cameroon", "Chad", "China", "Colombia", "Denmark", "Djibouti", "Dominica", "Ecuador", "Egypt", "Guinea", "Finland", "France", "Georgia", "Germany", "Guatemala", "Hungary", "India", "Iran", "Iraq", "Ireland", "Italy", "Jordan", "Kazakhstan", "Kenya", "Korea", "Kuwait", "Latvia", "Lebanon", "Mauritania", "Moldova", "Mongolia", "Montenegro", "Morocco", "Nepal", "Netherlands", "Niger", "Macedonia", "Norway", "Oman", "Panama", "Peru", "Philippines", "Poland", "Portugal", "Slovenia", "Spain", "Sudan", "Sweden", "Switzerland", "Tunisia", "Ukraine", "Uzbekistan", "China", "Algeria", "Angola", "Austria", "Azerbaijan", "Bangladesh", "Belgium", "Bulgaria", "Cameroon", "Chad", "China", "Colombia", "Denmark", "Djibouti", "Dominica", "Ecuador", "Egypt", "Guinea", "Finland", "France", "Georgia", "Germany", "Greece", "Guatemala", "Hungary", "India", "Iran", "Iraq", "Ireland", "Italy", "Jordan", "Kazakhstan", "Kenya", "Korea", "Kuwait", "Latvia", "Lebanon", "Mauritania", "Moldova", "Mongolia", "Montenegro", "Morocco", "Nepal", "Netherlands", "Niger", "Macedonia", "Norway", "Oman", "Panama", "Peru", "Philippines", "Poland", "Portugal", "Slovenia", "Spain", "Sudan", "Sweden", "Switzerland", "Tunisia", "Ukraine", "Uzbekistan", "Algeria", "Angola", "Austria", "Azerbaijan", "Bangladesh", "Belgium", "Bulgaria", "Cameroon", "Chad", "China", "Colombia", "Denmark", "Djibouti", "Dominica", "Ecuador", "Egypt", "Guinea", "Finland", "France", "Georgia", "Germany", "Greece", "Guatemala", "Hungary", "India", "Iran", "Iraq", "Ireland", "Italy", "Jordan", "Kazakhstan", "Kenya", "Korea", "Kuwait", "Latvia", "Lebanon", "Mauritania", "Moldova", "Mongolia", "Montenegro", "Morocco", "Nepal", "Netherlands", "Niger", "Macedonia", "Norway", "Oman", "Panama", "Peru", "Philippines", "Poland", "Portugal", "Slovenia", "Spain", "Sudan", "Sweden", "Switzerland", "Tunisia", "Ukraine", "Uzbekistan"], "CZ": ["Iceland", "Liechtenstein", "Norway", "Switzerland", "Iceland", "Liechtenstein", "Norway", "Switzerland", "Iceland", "Liechtenstein", "Norway", "Switzerland", "Iceland", "Liechtenstein", "Norway", "Switzerland", "Iceland", "Liechtenstein", "Norway", "Switzerland", "Iceland", "Liechtenstein", "Norway", "Switzerland", "Iceland", "Liechtenstein", "Norway", "Switzerland"], "SE": ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Switzerland", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Switzerland"], "TC": ["Austria", "Belgium", "China", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Iran", "Italy", "Japan", "Korea", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Monaco", "Netherlands", "Norway", "Poland", "Portugal", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Singapore", "Austria", "Belgium", "China", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Iran", "Italy", "Japan", "Korea", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Monaco", "Netherlands", "Norway", "Poland", "Portugal", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Singapore"], "SB": ["Austria", "Bahrain", "Belgium", "China", "Denmark", "France", "Germany", "Greece", "Indonesia", "Iran", "Israel", "Italy", "Japan", "Korea", "Kuwait", "Malaysia", "Netherlands", "Norway", "Qatar", "Singapore", "Spain", "Sweden", "Switzerland", "Thailand", "Afghanistan", "Algeria", "Andorra", "Argentina", "Armenia", "Australia", "Azerbaijan", "Bangladesh", "Belarus", "Bhutan", "Bolivia", "Brazil", "Brunei", "Bulgaria", "Cambodia", "Cameroon", "Chile", "Colombia", "Congo", "Cyprus", "Ecuador", "Egypt", "Estonia", "Finland", "Georgia", "Gibraltar", "Honduras", "Hungary", "Iceland", "India", "Ireland", "Jamaica", "Jordan", "Latvia", "Lebanon", "Liechtenstein", "Lithuania", "Luxembourg", "Maldives", "Mexico", "Moldova", "Monaco", "Mongolia", "Morocco", "Nepal", "Nigeria", "Macedonia", "Oman", "Pakistan", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Romania", "Senegal", "Serbia", "Slovenia", "Togo", "Turkey", "Ukraine"], "US": ["Austria", "Belgium", "China", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Iran", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland"] }; //a dict with country code -> banned countries
var autorotateOn = true; //autorotate plugin ON or OFF
var easerotateOn = true; //attempt to ease-in rotate ON or OFF

//For changing country names to ones that match the topojson feature. Example: Korea isn't found on the globe, but South Korea is, so it must run through this dictionary before checking the feature list

var regularToTopoCountryName = {
    'Korea': 'South Korea',
};

//Decode and prepare JSON variables for
// converting names to lat / longs
var codesToLats = { 'AD': '42.546245', 'AE': '23.424076', 'AF': '33.93911', 'AG': '17.060816', 'AI': '18.220554', 'AL': '41.153332', 'AM': '40.069099', 'AN': '12.226079', 'AO': '-11.202692', 'AQ': '-75.250973', 'AR': '-38.416097', 'AS': '-14.270972', 'AT': '47.516231', 'AU': '-25.274398', 'AW': '12.52111', 'AZ': '40.143105', 'BA': '43.915886', 'BB': '13.193887', 'BD': '23.684994', 'BE': '50.503887', 'BF': '12.238333', 'BG': '42.733883', 'BH': '25.930414', 'BI': '-3.373056', 'BJ': '9.30769', 'BM': '32.321384', 'BN': '4.535277', 'BO': '-16.290154', 'BR': '-14.235004', 'BS': '25.03428', 'BT': '27.514162', 'BV': '-54.423199', 'BW': '-22.328474', 'BY': '53.709807', 'BZ': '17.189877', 'CA': '56.130366', 'CC': '-12.164165', 'CD': '-4.038333', 'CF': '6.611111', 'CG': '-0.228021', 'CH': '46.818188', 'CI': '7.539989', 'CK': '-21.236736', 'CL': '-35.675147', 'CM': '7.369722', 'CN': '35.86166', 'CO': '4.570868', 'CR': '9.748917', 'CU': '21.521757', 'CV': '16.002082', 'CX': '-10.447525', 'CY': '35.126413', 'CZ': '49.817492', 'DE': '51.165691', 'DJ': '11.825138', 'DK': '56.26392', 'DM': '15.414999', 'DO': '18.735693', 'DZ': '28.033886', 'EC': '-1.831239', 'EE': '58.595272', 'EG': '26.820553', 'EH': '24.215527', 'ER': '15.179384', 'ES': '40.463667', 'ET': '9.145', 'FI': '61.92411', 'FJ': '-16.578193', 'FK': '-51.796253', 'FM': '7.425554', 'FO': '61.892635', 'FR': '46.227638', 'GA': '-0.803689', 'GB': '55.378051', 'GD': '12.262776', 'GE': '42.315407', 'GF': '3.933889', 'GG': '49.465691', 'GH': '7.946527', 'GI': '36.137741', 'GL': '71.706936', 'GM': '13.443182', 'GN': '9.945587', 'GP': '16.995971', 'GQ': '1.650801', 'GR': '39.074208', 'GS': '-54.429579', 'GT': '15.783471', 'GU': '13.444304', 'GW': '11.803749', 'GY': '4.860416', 'GZ': '31.354676', 'HK': '22.396428', 'HM': '-53.08181', 'HN': '15.199999', 'HR': '45.1', 'HT': '18.971187', 'HU': '47.162494', 'ID': '-0.789275', 'IE': '53.41291', 'IL': '31.046051', 'IM': '54.236107', 'IN': '20.593684', 'IO': '-6.343194', 'IQ': '33.223191', 'IR': '32.427908', 'IS': '64.963051', 'IT': '41.87194', 'JE': '49.214439', 'JM': '18.109581', 'JO': '30.585164', 'JP': '36.204824', 'KE': '-0.023559', 'KG': '41.20438', 'KH': '12.565679', 'KI': '-3.370417', 'KM': '-11.875001', 'KN': '17.357822', 'KP': '40.339852', 'KR': '35.907757', 'KW': '29.31166', 'KY': '19.513469', 'KZ': '48.019573', 'LA': '19.85627', 'LB': '33.854721', 'LC': '13.909444', 'LI': '47.166', 'LK': '7.873054', 'LR': '6.428055', 'LS': '-29.609988', 'LT': '55.169438', 'LU': '49.815273', 'LV': '56.879635', 'LY': '26.3351', 'MA': '31.791702', 'MC': '43.750298', 'MD': '47.411631', 'ME': '42.708678', 'MG': '-18.766947', 'MH': '7.131474', 'MK': '41.608635', 'ML': '17.570692', 'MM': '21.913965', 'MN': '46.862496', 'MO': '22.198745', 'MP': '17.33083', 'MQ': '14.641528', 'MR': '21.00789', 'MS': '16.742498', 'MT': '35.937496', 'MU': '-20.348404', 'MV': '3.202778', 'MW': '-13.254308', 'MX': '23.634501', 'MY': '4.210484', 'MZ': '-18.665695', 'NA': '-22.95764', 'NC': '-20.904305', 'NE': '17.607789', 'NF': '-29.040835', 'NG': '9.081999', 'NI': '12.865416', 'NL': '52.132633', 'NO': '60.472024', 'NP': '28.394857', 'NR': '-0.522778', 'NU': '-19.054445', 'NZ': '-40.900557', 'OM': '21.512583', 'PA': '8.537981', 'PE': '-9.189967', 'PF': '-17.679742', 'PG': '-6.314993', 'PH': '12.879721', 'PK': '30.375321', 'PL': '51.919438', 'PM': '46.941936', 'PN': '-24.703615', 'PR': '18.220833', 'PS': '31.952162', 'PT': '39.399872', 'PW': '7.51498', 'PY': '-23.442503', 'QA': '25.354826', 'RE': '-21.115141', 'RO': '45.943161', 'RS': '44.016521', 'RU': '61.52401', 'RW': '-1.940278', 'SA': '23.885942', 'SB': '-9.64571', 'SC': '-4.679574', 'SD': '12.862807', 'SE': '60.128161', 'SG': '1.352083', 'SH': '-24.143474', 'SI': '46.151241', 'SJ': '77.553604', 'SK': '48.669026', 'SL': '8.460555', 'SM': '43.94236', 'SN': '14.497401', 'SO': '5.152149', 'SR': '3.919305', 'ST': '0.18636', 'SV': '13.794185', 'SY': '34.802075', 'SZ': '-26.522503', 'TC': '21.694025', 'TD': '15.454166', 'TF': '-49.280366', 'TG': '8.619543', 'TH': '15.870032', 'TJ': '38.861034', 'TK': '-8.967363', 'TL': '-8.874217', 'TM': '38.969719', 'TN': '33.886917', 'TO': '-21.178986', 'TR': '38.963745', 'TT': '10.691803', 'TV': '-7.109535', 'TW': '23.69781', 'TZ': '-6.369028', 'UA': '48.379433', 'UG': '1.373333', 'UM': '', 'US': '37.09024', 'UY': '-32.522779', 'UZ': '41.377491', 'VA': '41.902916', 'VC': '12.984305', 'VE': '6.42375', 'VG': '18.420695', 'VI': '18.335765', 'VN': '14.058324', 'VU': '-15.376706', 'WF': '-13.768752', 'WS': '-13.759029', 'XK': '42.602636', 'YE': '15.552727', 'YT': '-12.8275', 'ZA': '-30.559482', 'ZM': '-13.133897', 'ZW': '-19.015438' };
var codesToLongs = { 'AD': '1.601554', 'AE': '53.847818', 'AF': '67.709953', 'AG': '-61.796428', 'AI': '-63.068615', 'AL': '20.168331', 'AM': '45.038189', 'AN': '-69.060087', 'AO': '17.873887', 'AQ': '-0.071389', 'AR': '-63.616672', 'AS': '-170.132217', 'AT': '14.550072', 'AU': '133.775136', 'AW': '-69.968338', 'AZ': '47.576927', 'BA': '17.679076', 'BB': '-59.543198', 'BD': '90.356331', 'BE': '4.469936', 'BF': '-1.561593', 'BG': '25.48583', 'BH': '50.637772', 'BI': '29.918886', 'BJ': '2.315834', 'BM': '-64.75737', 'BN': '114.727669', 'BO': '-63.588653', 'BR': '-51.92528', 'BS': '-77.39628', 'BT': '90.433601', 'BV': '3.413194', 'BW': '24.684866', 'BY': '27.953389', 'BZ': '-88.49765', 'CA': '-106.346771', 'CC': '96.870956', 'CD': '21.758664', 'CF': '20.939444', 'CG': '15.827659', 'CH': '8.227512', 'CI': '-5.54708', 'CK': '-159.777671', 'CL': '-71.542969', 'CM': '12.354722', 'CN': '104.195397', 'CO': '-74.297333', 'CR': '-83.753428', 'CU': '-77.781167', 'CV': '-24.013197', 'CX': '105.690449', 'CY': '33.429859', 'CZ': '15.472962', 'DE': '10.451526', 'DJ': '42.590275', 'DK': '9.501785', 'DM': '-61.370976', 'DO': '-70.162651', 'DZ': '1.659626', 'EC': '-78.183406', 'EE': '25.013607', 'EG': '30.802498', 'EH': '-12.885834', 'ER': '39.782334', 'ES': '-3.74922', 'ET': '40.489673', 'FI': '25.748151', 'FJ': '179.414413', 'FK': '-59.523613', 'FM': '150.550812', 'FO': '-6.911806', 'FR': '2.213749', 'GA': '11.609444', 'GB': '-3.435973', 'GD': '-61.604171', 'GE': '43.356892', 'GF': '-53.125782', 'GG': '-2.585278', 'GH': '-1.023194', 'GI': '-5.345374', 'GL': '-42.604303', 'GM': '-15.310139', 'GN': '-9.696645', 'GP': '-62.067641', 'GQ': '10.267895', 'GR': '21.824312', 'GS': '-36.587909', 'GT': '-90.230759', 'GU': '144.793731', 'GW': '-15.180413', 'GY': '-58.93018', 'GZ': '34.308825', 'HK': '114.109497', 'HM': '73.504158', 'HN': '-86.241905', 'HR': '15.2', 'HT': '-72.285215', 'HU': '19.503304', 'ID': '113.921327', 'IE': '-8.24389', 'IL': '34.851612', 'IM': '-4.548056', 'IN': '78.96288', 'IO': '71.876519', 'IQ': '43.679291', 'IR': '53.688046', 'IS': '-19.020835', 'IT': '12.56738', 'JE': '-2.13125', 'JM': '-77.297508', 'JO': '36.238414', 'JP': '138.252924', 'KE': '37.906193', 'KG': '74.766098', 'KH': '104.990963', 'KI': '-168.734039', 'KM': '43.872219', 'KN': '-62.782998', 'KP': '127.510093', 'KR': '127.766922', 'KW': '47.481766', 'KY': '-80.566956', 'KZ': '66.923684', 'LA': '102.495496', 'LB': '35.862285', 'LC': '-60.978893', 'LI': '9.555373', 'LK': '80.771797', 'LR': '-9.429499', 'LS': '28.233608', 'LT': '23.881275', 'LU': '6.129583', 'LV': '24.603189', 'LY': '17.228331', 'MA': '-7.09262', 'MC': '7.412841', 'MD': '28.369885', 'ME': '19.37439', 'MG': '46.869107', 'MH': '171.184478', 'MK': '21.745275', 'ML': '-3.996166', 'MM': '95.956223', 'MN': '103.846656', 'MO': '113.543873', 'MP': '145.38469', 'MQ': '-61.024174', 'MR': '-10.940835', 'MS': '-62.187366', 'MT': '14.375416', 'MU': '57.552152', 'MV': '73.22068', 'MW': '34.301525', 'MX': '-102.552784', 'MY': '101.975766', 'MZ': '35.529562', 'NA': '18.49041', 'NC': '165.618042', 'NE': '8.081666', 'NF': '167.954712', 'NG': '8.675277', 'NI': '-85.207229', 'NL': '5.291266', 'NO': '8.468946', 'NP': '84.124008', 'NR': '166.931503', 'NU': '-169.867233', 'NZ': '174.885971', 'OM': '55.923255', 'PA': '-80.782127', 'PE': '-75.015152', 'PF': '-149.406843', 'PG': '143.95555', 'PH': '121.774017', 'PK': '69.345116', 'PL': '19.145136', 'PM': '-56.27111', 'PN': '-127.439308', 'PR': '-66.590149', 'PS': '35.233154', 'PT': '-8.224454', 'PW': '134.58252', 'PY': '-58.443832', 'QA': '51.183884', 'RE': '55.536384', 'RO': '24.96676', 'RS': '21.005859', 'RU': '105.318756', 'RW': '29.873888', 'SA': '45.079162', 'SB': '160.156194', 'SC': '55.491977', 'SD': '30.217636', 'SE': '18.643501', 'SG': '103.819836', 'SH': '-10.030696', 'SI': '14.995463', 'SJ': '23.670272', 'SK': '19.699024', 'SL': '-11.779889', 'SM': '12.457777', 'SN': '-14.452362', 'SO': '46.199616', 'SR': '-56.027783', 'ST': '6.613081', 'SV': '-88.89653', 'SY': '38.996815', 'SZ': '31.465866', 'TC': '-71.797928', 'TD': '18.732207', 'TF': '69.348557', 'TG': '0.824782', 'TH': '100.992541', 'TJ': '71.276093', 'TK': '-171.855881', 'TL': '125.727539', 'TM': '59.556278', 'TN': '9.537499', 'TO': '-175.198242', 'TR': '35.243322', 'TT': '-61.222503', 'TV': '177.64933', 'TW': '120.960515', 'TZ': '34.888822', 'UA': '31.16558', 'UG': '32.290275', 'UM': '', 'US': '-95.712891', 'UY': '-55.765835', 'UZ': '64.585262', 'VA': '12.453389', 'VC': '-61.287228', 'VE': '-66.58973', 'VG': '-64.639968', 'VI': '-64.896335', 'VN': '108.277199', 'VU': '166.959158', 'WF': '-177.156097', 'WS': '-172.104629', 'XK': '20.902977', 'YE': '48.516388', 'YT': '45.166244', 'ZA': '22.937506', 'ZM': '27.849332', 'ZW': '29.154857' };
var namesToCodes = {
    'afghanistan': 'af',
    'aland islands': 'ax',
    'albania': 'al',
    'algeria': 'dz',
    'american samoa': 'as',
    'andorra': 'ad',
    'angola': 'ao',
    'anguilla': 'ai',
    'antarctica': 'aq',
    'antigua and barbuda': 'ag',
    'argentina': 'ar',
    'armenia': 'am',
    'aruba': 'aw',
    'australia': 'au',
    'austria': 'at',
    'azerbaijan': 'az',
    'bahamas': 'bs',
    'bahrain': 'bh',
    'bangladesh': 'bd',
    'barbados': 'bb',
    'belarus': 'by',
    'belgium': 'be',
    'belize': 'bz',
    'benin': 'bj',
    'bermuda': 'bm',
    'bhutan': 'bt',
    'bolivia': 'bo',
    'bosnia-herzegovina': 'ba',
    'bosnia and herzegovina': 'ba',
    'bosnia and herz.': 'ba',
    'botswana': 'bw',
    'bouvet island': 'bv',
    'brazil': 'br',
    'british indian ocean territory': 'io',
    'brunei': 'bn',
    'brunei darussalam': 'bn',
    'bulgaria': 'bg',
    'burkina faso': 'bf',
    'burundi': 'bi',
    'cambodia': 'kh',
    'cameroon': 'cm',
    'canada': 'ca',
    'cape verde': 'cv',
    'cayman islands': 'ky',
    'cayman isl.': 'ky',
    'central african republic': 'cf',
    'chad': 'td',
    'chile': 'cl',
    'china (mainland)': 'cn',
    'china': 'cn',
    'china (people\'s rep.) ': 'cn',
    'chinese taipei': 'tw',
    'christmas island': 'cx',
    'cocos (keeling) islands': 'cc',
    'colombia': 'co',
    'comoros': 'km',
    'comores islands': 'km',
    'dr congo': 'cg',
    'dem. rep. congo': 'cg',
    'congo': 'cg',
    'congo, democratic republic': 'cd',
    'cook islands': 'ck',
    'cook isl.': 'ck',
    'costa rica': 'cr',
    'ivory coast': 'ci',
    'cote d\'ivoire': 'ci',
    'croatia': 'hr',
    'cuba': 'cu',
    'cyprus': 'cy',
    'czech': 'cz',
    'czechia': 'cz',
    'czech republic': 'cz',
    'denmark': 'dk',
    'curaçao': 'cw',
    'djibouti': 'dj',
    'dominica': 'dm',
    'dominican': 'do',
    'dominican republic': 'do',
    'ecuador': 'ec',
    'egypt': 'eg',
    'el salvador': 'sv',
    'equatorial guinea': 'gq',
    'eritrea': 'er',
    'estonia': 'ee',
    'ethiopia': 'et',
    'falkland islands': 'fk',
    'falkland isl. (malvinas)': 'fk',
    'faroe islands': 'fo',
    'fiji': 'fj',
    'finland': 'fi',
    'france': 'fr',
    'french guiana': 'gf',
    'french polynesia': 'pf',
    'french southern territories': 'tf',
    'gabon': 'ga',
    'gambia': 'gm',
    'georgia': 'ge',
    'germany': 'de',
    'ghana': 'gh',
    'gibraltar': 'gi',
    'greece': 'gr',
    'greenland': 'gl',
    'grenada': 'gd',
    'guadeloupe': 'gp',
    'guam': 'gu',
    'guatemala': 'gt',
    'guernsey': 'gg',
    'guinea': 'gn',
    'guinea-bissau': 'gw',
    'guyana': 'gy',
    'haiti': 'ht',
    'heard island & mcdonald islands': 'hm',
    'vatican city': 'va',
    'holy see (vatican city state)': 'va',
    'holy see': 'va',
    'honduras': 'hn',
    'hong kong': 'hk',
    'hungary': 'hu',
    'iceland': 'is',
    'india': 'in',
    'indonesia': 'id',
    'iran': 'ir',
    'iran, islamic republic of': 'ir',
    'iraq': 'iq',
    'ireland': 'ie',
    'isle of man': 'im',
    'israel': 'il',
    'italy': 'it',
    'jamaica': 'jm',
    'japan': 'jp',
    'jersey': 'je',
    'jordan': 'jo',
    'kazakhstan': 'kz',
    'kenya': 'ke',
    'kiribati': 'ki',
    'republic of korea': 'kr',
    'korea, south': 'kr',
    'korea (rep.)': 'kr',
    'south korea': 'kr',
    'korea': 'kr',
    "democratic people's republic of korea": 'kp',
    "korea (dem. people's rep.)": 'kp',
    'north korea': 'kp',
    'kosovo': 'xk',
    'kosovo (rep.)': 'xk',
    'kuwait': 'kw',
    'kyrgyzstan': 'kg',
    'lao people\'s democratic republic': 'la',
    'latvia': 'lv',
    'lebanon': 'lb',
    'lesotho': 'ls',
    'liberia': 'lr',
    'libyan arab jamahiriya': 'ly',
    'liechtenstein': 'li',
    'lithuania': 'lt',
    'luxembourg': 'lu',
    'north macedonia': 'mk',
    'northern macedonia': 'mk',
    'macedonia': 'mk',
    'macao': 'mo',
    'macao (sar china)': 'mo',
    'macau': 'mo',
    'madagascar': 'mg',
    'malawi': 'mw',
    'malaysia': 'my',
    'maldives': 'mv',
    'mali': 'ml',
    'malta': 'mt',
    'marshall islands': 'mh',
    'marshall isl.': 'mh',
    'martinique': 'mq',
    'mauritania': 'mr',
    'mauritius': 'mu',
    'mayotte': 'yt',
    'mexico': 'mx',
    'micronesia, federated states of': 'fm',
    'micronesia (federated states)': 'fm',
    'moldova': 'md',
    'monaco': 'mc',
    'mongolia': 'mn',
    'montenegro': 'me',
    'montserrat': 'ms',
    'morocco': 'ma',
    'mozambique': 'mz',
    'myanmar': 'mm',
    'namibia': 'na',
    'nauru': 'nr',
    'nepal': 'np',
    'netherlands': 'nl',
    'netherlands antilles': 'an',
    'new caledonia': 'nc',
    'new zealand': 'nz',
    'nicaragua': 'ni',
    'niger': 'ne',
    'nigeria': 'ng',
    'niue': 'nu',
    'norfolk island': 'nf',
    'northern mariana islands': 'mp',
    'norway': 'no',
    'oman': 'om',
    'pakistan': 'pk',
    'palau': 'pw',
    'palestine': 'ps',
    'palestinian territory, occupied': 'ps',
    'panama': 'pa',
    'papua new guinea': 'pg',
    'paraguay': 'py',
    'peru': 'pe',
    'philippines': 'ph',
    'pitcairn': 'pn',
    'poland': 'pl',
    'portugal': 'pt',
    'puerto rico': 'pr',
    'qatar': 'qa',
    'reunion': 're',
    'romanian': 'ro',
    'romania': 'ro',
    'russian federation': 'ru',
    'russian fed.': 'ru',
    'russia': 'ru',
    'rwanda': 'rw',
    'saint barthelemy': 'bl',
    'saint helena': 'sh',
    'saint kitts and nevis': 'kn',
    'saint lucia': 'lc',
    'st. lucia': 'lc',
    'saint martin': 'mf',
    'saint pierre and miquelon': 'pm',
    'saint vincent and grenadines': 'vc',
    'st. vincent and the grenadines': 'vc',
    'samoa': 'ws',
    'san marino': 'sm',
    'sao tome and principe': 'st',
    'saudi arabia': 'sa',
    'senegal': 'sn',
    'serbia': 'rs',
    'seychelles': 'sc',
    'sierra leone': 'sl',
    'singapore': 'sg',
    'slovakia': 'sk',
    'slovenia': 'si',
    'solomon islands': 'sb',
    'solomon isl.': 'sb',
    'somalia': 'so',
    'south africa': 'za',
    'south georgia and sandwich isl.': 'gs',
    'spain': 'es',
    'sri lanka': 'lk',
    'sudan': 'sd',
    'suriname': 'sr',
    'svalbard and jan mayen': 'sj',
    'swaziland': 'sz',
    'sweden': 'se',
    'switzerland': 'ch',
    'syrian arab republic': 'sy',
    'taiwan*': 'tw',
    'taiwan': 'tw',
    'tajikistan': 'tj',
    'tanzania': 'tz',
    'thailand': 'th',
    'timor-leste': 'tl',
    'togo': 'tg',
    'tokelau': 'tk',
    'tonga': 'to',
    'trinidad and tobago': 'tt',
    'tunisia': 'tn',
    'turkey': 'tr',
    'turkmenistan': 'tm',
    'turks and caicos islands': 'tc',
    'tuvalu': 'tv',
    'uganda': 'ug',
    'ukraine': 'ua',
    'united arab emirates': 'ae',
    'u.a.e': 'ae',
    'kingdom': 'gb',
    'united kingdom': 'gb',
    'united states': 'us',
    'united states of america': 'us',
    'united states outlying islands': 'um',
    'uruguay': 'uy',
    'uzbekistan': 'uz',
    'vanuatu': 'vu',
    'venezuela': 've',
    'vietnam': 'vn',
    'viet nam': 'vn',
    'virgin islands, british': 'vg',
    'virgin islands, u.s.': 'vi',
    'wallis and futuna': 'wf',
    'western sahara': 'eh',
    'yemen': 'ye',
    'zambia': 'zm',
    'zimbabwe': 'zw'
};