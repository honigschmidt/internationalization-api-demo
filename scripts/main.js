function main() {
    const locales = ["en-US", "de-DE", "hu-HU"];

    const compInput1 = document.querySelector("#comp_input_1");
    const compInput2 = document.querySelector("#comp_input_2");
    const compLocaleSelector = document.querySelector("#comp_locale_selector");
    const compSensSelector = document.querySelector("#comp_sens_selector");
    const compSubmitBtn = document.querySelector("#comp_submit_btn");

    const dtLocaleSelector = document.querySelector("#dt_locale_selector");
    const dtSubmitBtn = document.querySelector("#dt_submit_btn");
    const dtResultField = document.querySelector("#dt_result");

    const numInput = document.querySelector("#num_input");
    const numLocaleSelector = document.querySelector("#num_locale_selector");
    const numSubmitBtn = document.querySelector("#num_submit_btn");
    const numResultField = document.querySelector("#num_result");

    compSubmitBtn.addEventListener("click", () => compare());
    dtSubmitBtn.addEventListener("click", () => dateTime());
    numSubmitBtn.addEventListener("click", () => formatNumber());

    generateLocaleLists(locales);
    dateTime();

    function compare() {
        const nameCollator = new Intl.Collator(compLocaleSelector.value, { sensitivity: compSensSelector.value });
        const val1 = compInput1.value;
        const val2 = compInput2.value;

        removeClasses(compInput1);
        removeClasses(compInput2);

        if (val1 == "" || val2 == "") {
            if (val1 == "") {
                compInput1.classList.add("error");
            }
            if (val2 == "") {
                compInput2.classList.add("error");
            }
        } else {
            var result = nameCollator.compare(val1, val2);
            switch (result) {
                case 1:
                    compInput1.classList.add("greenBG");
                    break;
                case 0:
                    compInput1.classList.add("orangeBG");
                    compInput2.classList.add("orangeBG");
                    break;
                case -1:
                    compInput2.classList.add("greenBG");
                    break;
            }
        }
    }

    function dateTime() {
        const actualDateTime = new Date();
        const formattedDateTime = new Intl.DateTimeFormat(dtLocaleSelector.value, {
            year: document.querySelector("#dt_year_selector").value,
            month: document.querySelector("#dt_month_selector").value,
            day: document.querySelector("#dt_day_selector").value,
            hour: document.querySelector("#dt_hour_selector").value,
            minute: document.querySelector("#dt_minute_selector").value,
            second: document.querySelector("#dt_second_selector").value,
            weekday: document.querySelector("#dt_weekday_selector").value,
            timeZoneName: document.querySelector("#dt_timezone_selector").value,
        }).format(actualDateTime);
        dtResultField.textContent = formattedDateTime;
    }

    function formatNumber() {
        const formattedValue = new Intl.NumberFormat("de-DE").format(numInput.value);
        numResultField.textContent = formattedValue;
    }

    function generateLocaleLists(locales) {
        locales.sort();
        locales.forEach(locale => {
            let newOption = document.createElement("option");
            newOption.textContent = locale;
            newOption.value = locale;
            compLocaleSelector.appendChild(newOption);
            dtLocaleSelector.appendChild(newOption.cloneNode(true));
            numLocaleSelector.appendChild(newOption.cloneNode(true));
        });
    }

    function removeClasses(element) {
        for (let singleClass of element.classList.values()) {
            element.classList.remove(singleClass);
        }
    }
}

document.addEventListener("DOMContentLoaded", main());