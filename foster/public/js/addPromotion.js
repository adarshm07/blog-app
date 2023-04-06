        // Start upload preview image
        // $(".gambar").attr("src", "https://user.gadjian.com/static/images/personnel_boy.png");

        
        var $uploadCrop, tempFilename, awImg, imageId;
        function readFile(input) {
            if (input.files && input.files[0]) {
              var reader = new FileReader();
                reader.onload = function (e) {
                    $('.upload-demo').addClass('ready');
                    $('#cropImagePop').modal('show');
                    rawImg = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
            else {
                swal("Sorry - you're browser doesn't support the FileReader API");
            }
        }

        $uploadCrop = $('#upload-demo').croppie({
            viewport: {
                width: 328,
                height: 328,
            },
            backgroundColor: '#f7fbff',
            enforceBoundary: false,
            enableExif: true
        });
        $('#cropImagePop').on('shown.bs.modal', function(){
            // alert('Shown pop');
            $uploadCrop.croppie('bind', {
                url: rawImg
            }).then(function(){
                console.log('jQuery bind complete');
            });
        });

        $('#image_upload').on('change', function (e) { 
            imageId = $(this).data('id'); 
            tempFilename = $(this).val();
            $('#cancelCropBtn').data('id', imageId); readFile(this);

            // frame.src=URL.createObjectURL(event.target.files[0]);

            console.log(e.target.files[0].name)
        });

        $('#cropImageBtn').on('click', function (ev) {
            $('#next_step').removeAttr('disabled')
            $uploadCrop.croppie('result', {
                type: 'base64',
                format: 'jpeg',
                backgroundColor: '#f7fbff',
                size: {width: 328, height: 328}
            }).then(function (resp) {
                $('.upload_info').hide();
                if ($(window).width() >= 768) {
                    $('.drug-drop').hide();
                } else {
                    $('#mobile_upload').hide();
                }
                $('.upload_preview').show();
                $('#item-img-output').attr('src', resp);
                $('#cropImagePop').modal('hide');
            });
        });
        // End upload preview image

        // REMOVE IMAGES
        $("#cross_icon").click(function(){
            $('#next_step').attr('disabled', 'disabled')
            $('.upload_preview').hide();
            if ($(window).width() >= 768) {
                $('.drug-drop').show();
            } else {
                $('#mobile_upload').show();
            }
            $('.upload_info').show();
            $('.cr-image').attr('src', '');
            $('#image_upload').val('');
        })

        // RANGE INPUT
        $(document).ready(function(){
            $('.cr-slider-wrap').children('input[type="range"]').attr('class', '');
            $('.zoom_slide').append($('.cr-slider-wrap'));
        })

        $(document).ready(function(){
            var smartwizard = $('#smartwizard').smartWizard({
                theme: 'default',
                transitionEffect:'fade',
                //onFinish:onFinishCallback,
                onLeaveStep  : leaveAStepCallback,
                labelNext:'Next',
                labelPrevious:'Back',
                labelFinish:'Promote',
                buttonOrder: ['prev', 'next', 'finish']
            });
            // CHECK FROM 
            function leaveAStepCallback(obj, context){
                if (context.toStep == 3) {
                    $('.buttonFinish').show()
                } else {
                    $('.buttonFinish').hide()
                }
                return true;                
            }
            $('<button type="button" class="discard btn btn-default btn_round" data-toggle="modal" data-target="#discard_modal">Discard</button>').insertBefore('.buttonNext')

            if ($(window).width() <= 767) {
                $('.buttonPrevious').appendTo('.mobile_back').removeClass('float-left').addClass('mobile')
            }
             
        });
    
        var countries = {
            "Country": "India",
            "Region": "Ohio, United State",
            "AD": "Andorra",
            "A2": "Andorra Test",
            "AE": "United Arab Emirates",
            "AF": "Afghanistan",
            "AG": "Antigua and Barbuda",
            "AI": "Anguilla",
            "AL": "Albania",
            "AM": "Armenia",
            "AN": "Netherlands Antilles",
            "AO": "Angola",
            "AQ": "Antarctica",
            "AR": "Argentina",
            "AS": "American Samoa",
            "AT": "Austria",
            "AU": "Australia",
            "AW": "Aruba",
            "AX": "\u00c5land Islands",
            "AZ": "Azerbaijan",
            "BA": "Bosnia and Herzegovina",
            "BB": "Barbados",
            "BD": "Bangladesh",
            "BE": "Belgium",
            "BF": "Burkina Faso",
            "BG": "Bulgaria",
            "BH": "Bahrain",
            "BI": "Burundi",
            "BJ": "Benin",
            "BL": "Saint Barth\u00e9lemy",
            "BM": "Bermuda",
            "BN": "Brunei",
            "BO": "Bolivia",
            "BQ": "British Antarctic Territory",
            "BR": "Brazil",
            "BS": "Bahamas",
            "BT": "Bhutan",
            "BV": "Bouvet Island",
            "BW": "Botswana",
            "BY": "Belarus",
            "BZ": "Belize",
            "CA": "Canada",
            "CC": "Cocos [Keeling] Islands",
            "CD": "Congo - Kinshasa",
            "CF": "Central African Republic",
            "CG": "Congo - Brazzaville",
            "CH": "Switzerland",
            "CI": "C\u00f4te d\u2019Ivoire",
            "CK": "Cook Islands",
            "CL": "Chile",
            "CM": "Cameroon",
            "CN": "China",
            "CO": "Colombia",
            "CR": "Costa Rica",
            "CS": "Serbia and Montenegro",
            "CT": "Canton and Enderbury Islands",
            "CU": "Cuba",
            "CV": "Cape Verde",
            "CX": "Christmas Island",
            "CY": "Cyprus",
            "CZ": "Czech Republic",
            "DD": "East Germany",
            "DE": "Germany",
            "DJ": "Djibouti",
            "DK": "Denmark",
            "DM": "Dominica",
            "DO": "Dominican Republic",
            "DZ": "Algeria",
            "EC": "Ecuador",
            "EE": "Estonia",
            "EG": "Egypt",
            "EH": "Western Sahara",
            "ER": "Eritrea",
            "ES": "Spain",
            "ET": "Ethiopia",
            "FI": "Finland",
            "FJ": "Fiji",
            "FK": "Falkland Islands",
            "FM": "Micronesia",
            "FO": "Faroe Islands",
            "FQ": "French Southern and Antarctic Territories",
            "FR": "France",
            "FX": "Metropolitan France",
            "GA": "Gabon",
            "GB": "United Kingdom",
            "GD": "Grenada",
            "GE": "Georgia",
            "GF": "French Guiana",
            "GG": "Guernsey",
            "GH": "Ghana",
            "GI": "Gibraltar",
            "GL": "Greenland",
            "GM": "Gambia",
            "GN": "Guinea",
            "GP": "Guadeloupe",
            "GQ": "Equatorial Guinea",
            "GR": "Greece",
            "GS": "South Georgia and the South Sandwich Islands",
            "GT": "Guatemala",
            "GU": "Guam",
            "GW": "Guinea-Bissau",
            "GY": "Guyana",
            "HK": "Hong Kong SAR China",
            "HM": "Heard Island and McDonald Islands",
            "HN": "Honduras",
            "HR": "Croatia",
            "HT": "Haiti",
            "HU": "Hungary",
            "ID": "Indonesia",
            "IE": "Ireland",
            "IL": "Israel",
            "IM": "Isle of Man",
            "IN": "India",
            "IO": "British Indian Ocean Territory",
            "IQ": "Iraq",
            "IR": "Iran",
            "IS": "Iceland",
            "IT": "Italy",
            "JE": "Jersey",
            "JM": "Jamaica",
            "JO": "Jordan",
            "JP": "Japan",
            "JT": "Johnston Island",
            "KE": "Kenya",
            "KG": "Kyrgyzstan",
            "KH": "Cambodia",
            "KI": "Kiribati",
            "KM": "Comoros",
            "KN": "Saint Kitts and Nevis",
            "KP": "North Korea",
            "KR": "South Korea",
            "KW": "Kuwait",
            "KY": "Cayman Islands",
            "KZ": "Kazakhstan",
            "LA": "Laos",
            "LB": "Lebanon",
            "LC": "Saint Lucia",
            "LI": "Liechtenstein",
            "LK": "Sri Lanka",
            "LR": "Liberia",
            "LS": "Lesotho",
            "LT": "Lithuania",
            "LU": "Luxembourg",
            "LV": "Latvia",
            "LY": "Libya",
            "MA": "Morocco",
            "MC": "Monaco",
            "MD": "Moldova",
            "ME": "Montenegro",
            "MF": "Saint Martin",
            "MG": "Madagascar",
            "MH": "Marshall Islands",
            "MI": "Midway Islands",
            "MK": "Macedonia",
            "ML": "Mali",
            "MM": "Myanmar [Burma]",
            "MN": "Mongolia",
            "MO": "Macau SAR China",
            "MP": "Northern Mariana Islands",
            "MQ": "Martinique",
            "MR": "Mauritania",
            "MS": "Montserrat",
            "MT": "Malta",
            "MU": "Mauritius",
            "MV": "Maldives",
            "MW": "Malawi",
            "MX": "Mexico",
            "MY": "Malaysia",
            "MZ": "Mozambique",
            "NA": "Namibia",
            "NC": "New Caledonia",
            "NE": "Niger",
            "NF": "Norfolk Island",
            "NG": "Nigeria",
            "NI": "Nicaragua",
            "NL": "Netherlands",
            "NO": "Norway",
            "NP": "Nepal",
            "NQ": "Dronning Maud Land",
            "NR": "Nauru",
            "NT": "Neutral Zone",
            "NU": "Niue",
            "NZ": "New Zealand",
            "OM": "Oman",
            "PA": "Panama",
            "PC": "Pacific Islands Trust Territory",
            "PE": "Peru",
            "PF": "French Polynesia",
            "PG": "Papua New Guinea",
            "PH": "Philippines",
            "PK": "Pakistan",
            "PL": "Poland",
            "PM": "Saint Pierre and Miquelon",
            "PN": "Pitcairn Islands",
            "PR": "Puerto Rico",
            "PS": "Palestinian Territories",
            "PT": "Portugal",
            "PU": "U.S. Miscellaneous Pacific Islands",
            "PW": "Palau",
            "PY": "Paraguay",
            "PZ": "Panama Canal Zone",
            "QA": "Qatar",
            "RE": "R\u00e9union",
            "RO": "Romania",
            "RS": "Serbia",
            "RU": "Russia",
            "RW": "Rwanda",
            "SA": "Saudi Arabia",
            "SB": "Solomon Islands",
            "SC": "Seychelles",
            "SD": "Sudan",
            "SE": "Sweden",
            "SG": "Singapore",
            "SH": "Saint Helena",
            "SI": "Slovenia",
            "SJ": "Svalbard and Jan Mayen",
            "SK": "Slovakia",
            "SL": "Sierra Leone",
            "SM": "San Marino",
            "SN": "Senegal",
            "SO": "Somalia",
            "SR": "Suriname",
            "ST": "S\u00e3o Tom\u00e9 and Pr\u00edncipe",
            "SU": "Union of Soviet Socialist Republics",
            "SV": "El Salvador",
            "SY": "Syria",
            "SZ": "Swaziland",
            "TC": "Turks and Caicos Islands",
            "TD": "Chad",
            "TF": "French Southern Territories",
            "TG": "Togo",
            "TH": "Thailand",
            "TJ": "Tajikistan",
            "TK": "Tokelau",
            "TL": "Timor-Leste",
            "TM": "Turkmenistan",
            "TN": "Tunisia",
            "TO": "Tonga",
            "TR": "Turkey",
            "TT": "Trinidad and Tobago",
            "TV": "Tuvalu",
            "TW": "Taiwan",
            "TZ": "Tanzania",
            "UA": "Ukraine",
            "UG": "Uganda",
            "UM": "U.S. Minor Outlying Islands",
            "US": "United States",
            "UY": "Uruguay",
            "UZ": "Uzbekistan",
            "VA": "Vatican City",
            "VC": "Saint Vincent and the Grenadines",
            "VD": "North Vietnam",
            "VE": "Venezuela",
            "VG": "British Virgin Islands",
            "VI": "U.S. Virgin Islands",
            "VN": "Vietnam",
            "VU": "Vanuatu",
            "WF": "Wallis and Futuna",
            "WK": "Wake Island",
            "WS": "Samoa",
            "YD": "People's Democratic Republic of Yemen",
            "YE": "Yemen",
            "YT": "Mayotte",
            "ZA": "South Africa",
            "ZM": "Zambia",
            "ZW": "Zimbabwe",
            "ZZ": "Unknown or Invalid Region"
        }
        // console.log(countries)
        var countriesArray = $.map(countries, function (value, key) { 
            return { value: value, data: key }; 
        });
        // console.log(countriesArray)

        var deleteSelect = '' 
        var selectedData = [];
        // console.log(countries.Country)
        
        

        function addItem(item) {
            selectedData.push(item)
            console.log(selectedData)
        };

        function removeItem(e){
            $(e).parent().parent().remove()
            if ($('.delete').length <= 0) {
                $('.no_data_tr').show()
            }
        }

        $('#autocomplete').blur(function(){
            if (this.value !== '') {
                $('[data-step]').removeAttr('disabled')
            } else {
                $('[data-step]').attr('disabled', 'disabled')
            }
        })

        // var titleVal = 0;
        // var ImageVal = 0;
        // $('#input_title_count').change(function(){
        //     if ($(this).val > titleVal) {
        //         titleVal = 1;
        //         $('.buttonNext').attr('disabled', 'disabled')
        //     }
        // })
  
        $('.range').each(function(){
            var value = $(this).attr('data-slider-value');
            var separator = value.indexOf(',');
            if( separator !== -1 ){
                value = value.split(',');
                value.forEach(function(item, i, arr) {
                    arr[ i ] = parseFloat( item );
                });
            } else {
                value = parseFloat( value );
            }
            $(this).slider({
                formatter: function(value) {
                    $('#sliderStatusMin').html(value)
                    return value;
                },
                min: parseFloat( $( this ).attr('data-slider-min') ),
                max: parseFloat( $( this ).attr('data-slider-max') ), 
                range: $( this ).attr('data-slider-range'),
                value: value,
                tooltip_split: $( this ).attr('data-slider-tooltip_split'),
                tooltip: $( this ).attr('data-slider-tooltip')
            });
        });

        // $('.cr-slider-wrap').slider({
        //     formatter: function(value) {
        //         $('#sliderStatusMin').html(value)
        //         return value;
        //     },
        //     min: '0.00',
        //     max: '1.5000', 
        //     value: $('.cr-slider-wrap').val(),
        // });
