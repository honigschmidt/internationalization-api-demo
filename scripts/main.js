function main() {
    const locales = ["en-US", "de-DE", "ja-JP"];
    const currencies = ["USD", "EUR", "JPY"];

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
    const numStyleSelector = document.querySelector("#num_style_selector");
    const numCurrencySelector = document.querySelector("#num_currency_selector");
    const numSubmitBtn = document.querySelector("#num_submit_btn");
    const numResultField = document.querySelector("#num_result");

    compSubmitBtn.addEventListener("click", () => compare());
    dtSubmitBtn.addEventListener("click", () => dateTime());
    numStyleSelector.addEventListener("change", () => {
        if (numStyleSelector.value == "currency") {
            numCurrencySelector.disabled = false;
        } else {
            numCurrencySelector.disabled = true;
        }
    })
    numSubmitBtn.addEventListener("click", () => formatNumber());

    generateLocaleLists(locales);
    generateCurrencyList(currencies);
    dateTime();
    numCurrencySelector.disabled = true;

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
                    compInput1.classList.add("greenBG");
                    compInput2.classList.add("greenBG");
                    break;
                case -1:
                    compInput2.classList.add("greenBG");
                    break;
            }
        }
    }

    function dateTime() {
        const actualDateTime = new Date();
        var h12Format = document.querySelector("#dt_hour12_selector").value == "true";
        const formattedDateTime = new Intl.DateTimeFormat(dtLocaleSelector.value, {
            year: document.querySelector("#dt_year_selector").value,
            month: document.querySelector("#dt_month_selector").value,
            day: document.querySelector("#dt_day_selector").value,
            hour: document.querySelector("#dt_hour_selector").value,
            hour12: h12Format,
            minute: document.querySelector("#dt_minute_selector").value,
            second: document.querySelector("#dt_second_selector").value,
            weekday: document.querySelector("#dt_weekday_selector").value,
            timeZoneName: document.querySelector("#dt_timezone_selector").value,
        }).format(actualDateTime);
        dtResultField.textContent = formattedDateTime;
    }

    function formatNumber() {
        const formattedValue = new Intl.NumberFormat(numLocaleSelector.value, {
            style: numStyleSelector.value,
            currency: numCurrencySelector.value
        }).format(numInput.value);
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

    function generateCurrencyList(currencies) {
        currencies.sort();
        currencies.forEach(currency => {
            let newOption = document.createElement("option");
            newOption.textContent = currency;
            newOption.value = currency;
            numCurrencySelector.appendChild(newOption);
        });
        // numCurrencySelector
    }

    function removeClasses(element) {
        for (let classListValue of element.classList.values()) {
            element.classList.remove(classListValue);
        }
    }
}

document.addEventListener("DOMContentLoaded", main());