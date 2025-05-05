let SEED = "666";
Nof1.SET_SEED(SEED);

let experiment_configuration_function = (writer) => {
    return {

        experiment_name: "TestExperiment",
        seed: SEED,

        introduction_pages: writer.stage_string_pages_commands([
            writer.convert_string_to_html_string(
                "Please, just do this experiment only, when you have enough time, are concentrated enough, and motivated enough.\n\nPlease, open the browser in fullscreen mode (probably by pressing [F11])."),
            writer.convert_string_to_html_string(
                "In this experiment, you will be asked to manually compute the result of an mathematical term.\n\nDon't worry, the terms are not too complex.")
        ]),

        pre_run_training_instructions: writer.string_page_command(
            writer.convert_string_to_html_string(
                "You entered the training phase."
            )),

        pre_run_experiment_instructions: writer.string_page_command(
            writer.convert_string_to_html_string(
                "You entered the experiment phase.\n\n"
            )),

        finish_pages: [
            writer.string_page_command(
                writer.convert_string_to_html_string(
                    "Almost done. Next, the experiment data will be downloaded. Please, send the " +
                    "downloaded file to the experimenter.\n\nAfter sending your email, you can close this window.\n\nMany thanks for participating in the experiment."
                )
            )
        ],

        layout: [
            {variable: "Function", treatments: ["sumArray", "findMax", "findMin"]},
            {variable: "CommentStyle", treatments: ["top", "inline_raw", "inline_formatted"]},
        ],

        training_configuration: {
            fixed_treatments: "",
            can_be_cancelled: false,
            can_be_repeated: false
        },

        repetitions: 1,

        measurement: Nof1.Reaction_time(Nof1.keys(["Enter"])),

        task_configuration: (t) => {
            t.do_print_task = () => {
                writer.clear_stage();

                const func = t.treatment_combination[0].value;
                const variant = t.treatment_combination[1].value;
                const code = codeExamples[func][variant];

                const html = "<pre>" + code + "</pre><p><strong>Lies den Code und drücke [Enter], wenn du fertig bist.</strong></p>";
                writer.print_html_on_stage(html);
            };

            t.accepts_answer_function = (given_answer) => {
                return given_answer === "Enter";
            };

            t.do_print_error_message = (given_answer) => {
                writer.clear_stage();
                writer.clear_error();
                writer.print_html_on_error("<h1>Invalid answer: " + given_answer + "");
            };

            t.do_print_after_task_information = () => {
                writer.clear_error();
                writer.print_string_on_stage(writer.convert_string_to_html_string(
                    "Correct.\n\n" +
                    "In case, you feel not concentrated enough, make a short break.\n\n" +
                    "Press [Enter] to go on. "));
            }
        }
    }
};

Nof1.BROWSER_EXPERIMENT(experiment_configuration_function);

// Validierung, dass man den Code verstanden hat
// abfragen, antworten - Hint geben in den Kommentare (Hat man den Code wirklich verstanden?)
// Weniger Fälle

// Nächste Woche: Hauptfaktor sichtbar!!! Jamovi!
