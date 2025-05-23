(() => {
    var t = {
        470: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Automata = e.init = void 0;
            const i = n(240);
            e.init = function () {
            }, e.Automata = class {
                constructor(t) {
                    this.current_state = -1, this.transitions = [], this.states = [], this.start_state = t.start, this.states = t.states;
                    for (let t = 0; t < this.states.length; t++) this.transitions.push([]);
                    for (let e of t.transitions) this.transitions[e.from].push(e);
                    this.init_function = t.init_function, this.end_states = t.end_states
                }

                input(t) {
                    let e = this.first_match(t), n = this.current_state;
                    null != e && (this.current_state = e.next_state, e.action(n, t, this.current_state))
                }

                start() {
                    this.current_state = this.start_state
                }

                first_match(t) {
                    for (let e = 0; e < this.transitions[this.current_state].length; e++) if (this.transitions[this.current_state][e].accepts(t)) return this.transitions[this.current_state][e];
                    return null
                }

                initialize() {
                    this.current_state = this.start_state, this.init_function()
                }

                add_finish_action(t) {
                    for (let e of this.transitions) for (let n of e) if (this.is_transition_to_end(n)) {
                        let e = n.action;
                        n.action = (n, i, r) => {
                            e(n, i, r), t()
                        }
                    }
                }

                is_transition_to_end(t) {
                    return (0, i.contains)(this.end_states, t.next_state)
                }

                add_action_to_transitions(t, e) {
                    for (let n of this.transitions) for (let i of n) if (t(i)) {
                        let t = i.action;
                        i.action = (n, i, r) => {
                            t(n, i, r), e()
                        }
                    }
                }
            }
        }, 513: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.create_automata = e.Automata_Configurator = e.init = void 0;
            const i = n(470);
            e.init = function () {
            };

            class r {
                constructor(t, e, n, i, r) {
                    this.states = t, this.start = e, this.init_function = n, this.transitions = i, this.end_states = r
                }
            }

            e.Automata_Configurator = r, e.create_automata = function (t, e, n, s, o) {
                return new i.Automata(new r(t, e, n, s, o))
            }
        }, 119: (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Automata_Forwarder = void 0, e.Automata_Forwarder = class {
                constructor(t) {
                    this.set_active_function = () => {
                    }, this.forwarder_name = t
                }

                input(t) {
                    this.automata.input(t)
                }

                set_active() {
                    this.set_active_function()
                }

                add_activation_function(t) {
                    let e = this.set_active_function;
                    this.set_active_function = () => {
                        e(), t()
                    }
                }
            }
        }, 389: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.from = e.pass = e.do_nothing = e.accept_all = e.Simple_Transition = e.Transition = e.each_char = e.if_func = e.keys = e.Transition_Acceptor_Function = e.init = void 0;
            const i = n(240);
            e.init = function () {
            };

            class r {
            }

            class s extends r {
                constructor(t) {
                    super(), this.accepted_strings = t
                }

                accepts(t) {
                    return (0, i.contains)(this.accepted_strings, t)
                }
            }

            class o extends r {
                constructor(t) {
                    super(), this.acceptor_function = t
                }

                accepts(t) {
                    return this.acceptor_function(t)
                }
            }

            e.Transition_Acceptor_Function = o;

            class a extends r {
                accepts(t) {
                    return !0
                }
            }

            e.keys = function (t) {
                return new s(t)
            }, e.if_func = function (t) {
                return new o(t)
            }, e.each_char = function (t) {
                var e = [];
                for (let n of t) e.push(n);
                return new s(e)
            };

            class _ {
                constructor(t, e, n, i) {
                    this.from = t, this.acceptor = e, this.next_state = n, this.action = i
                }

                is_valid_input(t) {
                    return this.acceptor.accepts(t)
                }

                accepts(t) {
                    return this.acceptor.accepts(t)
                }
            }

            function u(t, e, n, i) {
                return new _(t, new o(e), n, ((t, e, n) => i(e)))
            }

            e.Transition = _, e.Simple_Transition = u, e.accept_all = function () {
                return new a
            }, e.do_nothing = function (t, e, n) {
            }, e.pass = function (t) {
                return (e, n, i) => t()
            }, e.from = function (t) {
                return {
                    to: e => ({
                        on: n => ({
                            if: i => ({do: r => u(t, (t => t == n && i()), e, r)}),
                            do: i => u(t, (t => t == n), e, i)
                        }),
                        on_any: n => ({
                            if: r => ({do: s => u(t, (t => (0, i.contains)(n, t) && r()), e, s)}),
                            do: r => u(t, (t => (0, i.contains)(n, t)), e, r)
                        })
                    })
                }
            }
        }, 445: (t, e) => {
            "use strict";
            var n, i, r, s;
            Object.defineProperty(e, "__esModule", {value: !0}), e.Browser_IO = e.Simplified_IO = e.Automata_IO = e.AUTOMATA_INPUT_TYPE = e.AUTOMATA_OUTPUT_WRITER_TAGS = e.AUTOMATA_OUTPUT_WRITER_ACTION = e.AUTOMATA_OUTPUT_OBJECT_FORMAT = void 0, function (t) {
                t[t.TEXT = 0] = "TEXT", t[t.CODE = 1] = "CODE", t[t.HTML = 2] = "HTML", t[t.CODE_IN_HTML = 3] = "CODE_IN_HTML"
            }(n || (e.AUTOMATA_OUTPUT_OBJECT_FORMAT = n = {})), function (t) {
                t[t.APPEND = 0] = "APPEND", t[t.OVERWRITE = 1] = "OVERWRITE"
            }(i || (e.AUTOMATA_OUTPUT_WRITER_ACTION = i = {})), function (t) {
                t[t.STATE = 0] = "STATE", t[t.TASK = 1] = "TASK", t[t.STAGE = 2] = "STAGE"
            }(r || (e.AUTOMATA_OUTPUT_WRITER_TAGS = r = {})), function (t) {
                t[t.TEXT = 0] = "TEXT", t[t.ALTERNATIVES = 1] = "ALTERNATIVES", t[t.NUMBER = 2] = "NUMBER"
            }(s || (e.AUTOMATA_INPUT_TYPE = s = {}));

            class o {
            }

            e.Automata_IO = o, e.Simplified_IO = class extends o {
                write(t, e, n) {
                    e == r.STAGE && (t == i.APPEND ? this.output_string += n.as_raw_string() : t == i.OVERWRITE && (this.output_string = n.as_raw_string()))
                }
            }, e.Browser_IO = class extends o {
                write(t, e, n) {
                    t == i.OVERWRITE && (document.getElementById(r[e]).textContent = ""), n.print_to_html_element(document.getElementById(r[e]))
                }
            }
        }, 688: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Automata_With_Output_Forwarder = e.init = void 0;
            const i = n(413), r = n(445), s = n(119);
            e.init = function () {
            };

            class o extends s.Automata_Forwarder {
                constructor(t, e, n, s) {
                    super(t), this.output_writer = e, this.pre_run_instructions = s, this.accepted_experiment_responses = n, this.add_activation_function((() => this.output_writer.write(r.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, r.AUTOMATA_OUTPUT_WRITER_TAGS.STATE, (0, i.text_line)(this.forwarder_name))))
                }
            }

            e.Automata_With_Output_Forwarder = o
        }, 738: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Book_tests = e.create_book = e.Book = e.init = void 0;
            const i = n(389), r = n(240), s = n(513), o = n(688), a = n(413), _ = n(445);
            e.init = function () {
            };

            class u extends o.Automata_With_Output_Forwarder {
                constructor(t, e, n) {
                    super(t, n, null, null), this.current_page = -1, this.pages = e, this.current_page = 0, this.print_current_page = () => {
                        this.output_writer.write(_.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, _.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, this.pages[this.current_page]), 0 == this.current_page && this.pages.length > 1 ? this.output_writer.write(_.AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, _.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, (0, a.text_line)("Use right arrow [->] to go to the next question.")) : this.current_page == this.pages.length - 1 && this.pages.length > 1 ? this.output_writer.write(_.AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, _.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, (0, a.text_line)("Use left arrow [<-] to go to the previous question.")) : this.current_page > 0 && this.current_page < this.pages.length - 1 && (this.output_writer.write(_.AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, _.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, (0, a.text_line)("Use right arrow [->] to go to the next question.")), this.output_writer.write(_.AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, _.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, (0, a.text_line)("Use left arrow [<-] to go to the previous question."))), this.output_writer.write(_.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, _.AUTOMATA_OUTPUT_WRITER_TAGS.TASK, (0, a.text_line)(this.current_page + 1 + "/" + this.pages.length))
                    }, this.create_and_init_automata(), this.set_active()
                }

                create_and_init_automata() {
                    this.automata = (0, s.create_automata)(this.states(), this.start_state(), (() => {
                        this.print_current_page()
                    }), this.create_transitions(), this.end_states()), this.automata.initialize()
                }

                end_states() {
                    return [1]
                }

                start_state() {
                    return 0
                }

                states() {
                    return [0, 1]
                }

                create_transitions() {
                    return [(0, i.from)(0).to(0).on("ArrowRight").if((() => this.current_page < this.pages.length - 1)).do((() => {
                        this.go_to_next_page()
                    })), (0, i.from)(0).to(0).on("ArrowLeft").if((() => this.current_page > 0)).do((() => {
                        this.go_to_previous_page()
                    })), (0, i.from)(0).to(1).on("Enter").if((() => this.current_page == this.pages.length - 1)).do((() => {
                    }))]
                }

                go_to_previous_page() {
                    this.pages[this.current_page].do_action(), this.current_page--, this.print_current_page()
                }

                go_to_next_page() {
                    this.pages[this.current_page].do_action(), this.current_page++, this.print_current_page()
                }

                set_active() {
                    super.set_active(), this.print_current_page()
                }
            }

            function c(t, e, n) {
                return new u(t, e, n)
            }

            e.Book = u, e.create_book = c, e.Book_tests = function () {
                let t = new _.Simplified_IO,
                    e = c("My book", (0, a.text_pages)(["Book1_Page1", "Book1_Page2", "Book1_Page3"]), t);
                (0, r.guarantee_true)("Book1_Page1" == t.output_string), e.input("ArrowRight"), (0, r.guarantee_true)("Book1_Page2" == t.output_string)
            }
        }, 413: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.text_pages = e.code_page = e.code_line = e.text_as_pages = e.html_line = e.text_line = e.alternatives = e.free_text = e.Alternatives = e.Text_Input = e.Input_Object = e.IO_Object = void 0;
            const i = n(240), r = n(445);

            class s {
                constructor(t) {
                    this.to_write = t
                }

                as_raw_string() {
                    return this.to_write.map((t => t.text)).join()
                }

                print_to_html_element(t) {
                    for (let e of this.to_write) if (e.format == r.AUTOMATA_OUTPUT_OBJECT_FORMAT.HTML) {
                        let n = (new DOMParser).parseFromString(e.text, "text/html");
                        t.appendChild(n.body)
                    } else if (e.format == r.AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT || e.format == r.AUTOMATA_OUTPUT_OBJECT_FORMAT.CODE) {
                        let n = "";
                        e.format == r.AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT ? n = "<ordinarytext>" + i.string_to_html(e.text) + "</ordinarytext>" : e.format == r.AUTOMATA_OUTPUT_OBJECT_FORMAT.CODE && (n = "<simplecode>" + i.string_to_html(e.text) + "</simplecode>");
                        let s = (new DOMParser).parseFromString(n, "text/html");
                        t.appendChild(s.body)
                    } else if (e.format == r.AUTOMATA_OUTPUT_OBJECT_FORMAT.CODE_IN_HTML) {
                        let n = "";
                        n = "<ordinarytext>" + e.text + "</ordinarytext>";
                        let i = (new DOMParser).parseFromString(n, "text/html");
                        t.appendChild(i.body)
                    }
                }

                do_action() {
                }
            }

            e.IO_Object = s;

            class o extends s {
                constructor(t, e, n) {
                    super(e), this.variable_name = t, this.answer_required = n
                }

                has_valid_input() {
                    return this.do_action(), !(null == this.value || null == this.value)
                }

                can_be_left() {
                    return !this.answer_required || this.has_valid_input()
                }
            }

            e.Input_Object = o;

            class a extends o {
                constructor(t, e, n) {
                    super(t, e, n);
                    let i = new DOMParser;
                    this.input = i.parseFromString("<input type='text'/>", "text/html").body.lastElementChild
                }

                print_to_html_element(t) {
                    super.print_to_html_element(t), t.appendChild(this.input)
                }

                has_valid_input() {
                    return super.has_valid_input() && "" != this.value
                }

                do_action() {
                    this.value = this.input.value
                }
            }

            e.Text_Input = a;

            class _ extends o {
                constructor(t, e, n, i) {
                    super(t, e, i), this.options = n;
                    let r = "<select><option disabled selected value> -- select an option -- </option>";
                    for (let t of n) r += '<option value = "' + t + '">' + t + "</option>";
                    this.input = (new DOMParser).parseFromString(r + "</select>", "text/html").body.lastElementChild
                }

                print_to_html_element(t) {
                    super.print_to_html_element(t), t.appendChild(this.input)
                }

                do_action() {
                    this.value = this.input.value
                }

                has_valid_input() {
                    return super.has_valid_input() && "" != this.value
                }
            }

            function u(t) {
                return new s([{text: t, format: r.AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}])
            }

            function c(t) {
                return new s([{text: t, format: r.AUTOMATA_OUTPUT_OBJECT_FORMAT.CODE}])
            }

            e.Alternatives = _, e.free_text = function (t, e, n) {
                return new a(t, [{text: e, format: r.AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}], n)
            }, e.alternatives = function (t, e, n, i) {
                return new _(t, [{text: e, format: r.AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}], n, i)
            }, e.text_line = u, e.html_line = function (t) {
                return new s([{text: t, format: r.AUTOMATA_OUTPUT_OBJECT_FORMAT.HTML}])
            }, e.text_as_pages = function (t) {
                return [u(t)]
            }, e.code_line = c, e.code_page = function (t) {
                return [c(t)]
            }, e.text_pages = function (t) {
                let e = [];
                for (let n of t) e.push(new s([{text: n, format: r.AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}]));
                return e
            }
        }, 958: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Books_tests = e.Sequential_Forwarder_Forwarder = void 0;
            const i = n(119), r = n(513), s = n(389), o = n(738), a = n(240), _ = n(413), u = n(445);

            class c extends i.Automata_Forwarder {
                constructor(t) {
                    super("Default Sequential Forwarder Forwader"), this.current_forwarder_index = 0, this.forwarders = t;
                    for (let e of t) e.automata.add_finish_action((() => this.automata.input("switch to next state")));
                    this.automata = (0, r.create_automata)([0, 1], 0, (() => {
                    }), [(0, s.from)(0).to(0).on("switch to next state").if((() => this.current_forwarder_index < this.forwarders.length - 1)).do((() => {
                        this.current_forwarder_index++, this.current_forwarder().set_active()
                    })), (0, s.from)(0).to(1).on("switch to next state").if((() => this.current_forwarder_index == this.forwarders.length - 1)).do((() => {
                    }))], [1]), this.automata.initialize(), this.set_active(), console.log("active forward: " + this.current_forwarder().forwarder_name)
                }

                input(t) {
                    this.forwarders[this.current_forwarder_index].input(t)
                }

                input_sequence(t) {
                    for (let e of t) this.input(e)
                }

                current_forwarder() {
                    return this.forwarders[this.current_forwarder_index]
                }

                set_active() {
                    super.set_active(), this.current_forwarder().set_active()
                }
            }

            e.Sequential_Forwarder_Forwarder = c, e.Books_tests = function () {
                let t = new u.Simplified_IO,
                    e = (0, o.create_book)("MyBook1", (0, _.text_pages)(["Book1_Page1", "Book1_Page2", "Book1_Page3"]), t),
                    n = (0, o.create_book)("MyBook2", (0, _.text_pages)(["Book2_Page1", "Book2_Page2", "Book2_Page3"]), t),
                    i = new c([e, n]);
                i.automata.add_finish_action((() => t.write(u.AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, u.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, (0, _.text_line)("DONE")))), (0, a.guarantee_test)((() => "Book1_Page1" == this.string_output)), i.input("ArrowRight"), (0, a.guarantee_test)((() => "Book1_Page2" == this.string_output)), i.input("ArrowLeft"), (0, a.guarantee_test)((() => "Book1_Page1" == this.string_output)), i.input("ArrowRight"), i.input("ArrowRight"), (0, a.guarantee_test)((() => "Book1_Page3" == this.string_output)), i.input("Enter"), (0, a.guarantee_test)((() => "Book2_Page1" == this.string_output)), i.input("ArrowLeft"), (0, a.guarantee_test)((() => "Book2_Page1" == this.string_output)), i.input("ArrowRight"), i.input("ArrowRight"), (0, a.guarantee_test)((() => "Book2_Page3" == this.string_output)), i.input("Enter"), (0, a.guarantee_test)((() => "DONE" == this.string_output))
            }
        }, 997: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.create_code_experiment_execution = e.Code_Experiment_Definition = e.init = void 0;
            const i = n(462), r = n(352), s = n(738), o = n(157), a = n(958), _ = n(986), u = n(413), c = n(993),
                T = n(445), h = n(686);
            e.init = function () {
            };

            class d extends r.Experiment_Definition {
                create_code_experiment_execution(t, e, n, i, r, _, h) {
                    let d = new s.Book("introduction", t, r);
                    d.add_activation_function((() => {
                        r.write(T.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, T.AUTOMATA_OUTPUT_WRITER_TAGS.TASK, (0, u.text_line)("")), r.write(T.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, T.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, (0, u.text_line)(""))
                    }));
                    let p = new s.Book("finish", i, r);
                    p.add_activation_function((() => {
                        r.write(T.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, T.AUTOMATA_OUTPUT_WRITER_TAGS.TASK, (0, u.text_line)("")), r.write(T.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, T.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, (0, u.text_line)(""))
                    })), p.automata.add_finish_action((() => h(f.experiment_definition)));
                    let l = new c.Training_Experiment_Execution_Forwarder("Training", n, this.clone(), r, _),
                        f = new o.Experiment_Execution_Forwarder("Experiment", e, n, this, r, _);
                    return new a.Sequential_Forwarder_Forwarder([d, l, f, p])
                }

                clone() {
                    return new d(this.template.experiment_name, "" + (0, h.new_random_integer)(123456789), this.template.variables, this.template.repetitions, this.template.task_creator)
                }

                create_Task(t) {
                    return new i.Code_Task(t, this, "")
                }
            }

            e.Code_Experiment_Definition = d, e.create_code_experiment_execution = function (t) {
                let e = [];
                for (let n of t.layout) e.push(new _.Variable(n.variable, n.treatments));
                return new d(t.experiment_name, t.seed, e, t.repetitions, t.task_configuration).create_code_experiment_execution(t.introduction_pages, t.seed, t.pre_run_instructions, t.finish_pages, t.output_object, t.accepted_responses, t.finish_function)
            }
        }, 352: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Experiment_Definition = e.init = void 0;
            const i = n(686), r = n(686);
            e.init = function () {
            }, e.Experiment_Definition = class {
                constructor(t, e, n, i, r) {
                    this.tasks = [], this.repetitions = 1, this.template = {
                        experiment_name: t,
                        variables: n,
                        repetitions: i,
                        task_creator: r
                    }, this.experiment_name = t, this.variables = n, this.repetitions = i, this.task_creator = r, this.init_experiment(e)
                }

                init_experiment(t) {
                    (0, r.SET_SEED)(t), this.createTasks(), this.do_random_task_ordering()
                }

                createTasks() {
                    this.tasks = [], this.all_treatment_combinations_do((t => {
                        let e = this.create_Task(t);
                        this.task_creator(e), this.tasks.push(e)
                    }))
                }

                all_treatment_combinations_do(t) {
                    for (let e = 1; e <= this.repetitions; e++) this.variables[0].all_treatment_combinations_do([], this.variables.slice(1), t)
                }

                do_random_task_ordering() {
                    let t = [], e = this.tasks.slice(), n = 1;
                    for (; t.length < this.tasks.length;) {
                        let r = i.new_random_integer(e.length);
                        t.push(e[r]), e[r].task_number_in_execution = n, e.splice(r, 1), n++
                    }
                    this.tasks = t
                }

                generate_csv_data() {
                    let t = [];
                    for (let e of this.variables) t.push(e.name + ";");
                    t.push("expected_answer;given_answer;is_correct;time_in_milliseconds;\n");
                    for (let e of this.tasks) {
                        for (let n of e.treatment_combination) t.push(n.value + ";");
                        t.push(e.expected_answer + ";"), t.push(e.given_answer + ";"), t.push((e.given_answer == e.expected_answer) + ";"), t.push(e.required_miliseconds + ";"), t.push("\n")
                    }
                    return t
                }
            }
        }, 157: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Experiment_Execution_Forwarder = void 0;
            const i = n(513), r = n(389), s = n(413), o = n(445), a = n(688), _ = n(686);

            class u extends a.Automata_With_Output_Forwarder {
                current_task() {
                    return this.experiment_definition.tasks[this.current_task_index]
                }

                constructor(t, e, n, i, r, s) {
                    super(t, r, s, n), this.current_task_index = 0, this.start_time = null, this.end_time = null, this.experiment_definition = i, this.seed = e, this.create_and_init_automata(), this.set_active()
                }

                set_active() {
                    this.current_task_index = 0, super.set_active(), (0, _.SET_SEED)(this.seed), this.output_writer.write(o.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, o.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, this.pre_run_instructions)
                }

                create_and_init_automata() {
                    this.automata = (0, i.create_automata)([0, 1, 2, 3, 4], 0, (() => {
                    }), [(0, r.from)(0).to(1).on("Enter").do((t => {
                        this.start_time = (new Date).getTime().valueOf(), this.current_task().print_task_on(this.output_writer)
                    })), (0, r.from)(1).to(2).on_any(this.accepted_experiment_responses).if((() => this.current_task_index < this.experiment_definition.tasks.length - 1)).do((t => {
                        this.end_time = (new Date).getTime().valueOf(), this.current_task().given_answer = t, this.current_task().required_miliseconds = this.end_time - this.start_time, this.current_task().print_between_tasks(this.output_writer)
                    })), (0, r.from)(2).to(1).on("Enter").if((() => this.current_task_index < this.experiment_definition.tasks.length - 1)).do((t => {
                        this.start_time = (new Date).getTime().valueOf(), this.current_task_index++, this.current_task().print_task_on(this.output_writer)
                    })), (0, r.from)(1).to(3).on_any(this.accepted_experiment_responses).if((() => this.current_task_index == this.experiment_definition.tasks.length - 1)).do((t => {
                        this.end_time = (new Date).getTime().valueOf(), this.current_task().given_answer = t, this.current_task().required_miliseconds = this.end_time - this.start_time, this.current_task().print_between_tasks(this.output_writer)
                    })), (0, r.from)(3).to(4).on("Enter").do((() => {
                        this.output_writer.write(o.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, o.AUTOMATA_OUTPUT_WRITER_TAGS.TASK, (0, s.text_line)(""))
                    }))], [4]), this.automata.initialize()
                }
            }

            e.Experiment_Execution_Forwarder = u
        }, 686: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Experimentation_Tests = e.new_random_integer = e.SET_SEED = e.Random = e.VARIABLE_TYPE = e.init = void 0;
            const i = n(377), r = n(240), s = n(997), o = n(413), a = n(445);
            var _;
            e.init = function () {
            }, function (t) {
                t[t.STRING = 1] = "STRING", t[t.NUMBER = 2] = "NUMBER"
            }(_ || (e.VARIABLE_TYPE = _ = {})), e.Random = new class {
                constructor() {
                    this.generator = i("1234567890")
                }

                new_random_integer(t) {
                    return Math.trunc(t * this.generator())
                }

                set_seed(t) {
                    this.generator = i(t)
                }
            }, e.SET_SEED = function (t) {
                e.Random.set_seed(t)
            }, e.new_random_integer = function (t) {
                return e.Random.new_random_integer(t)
            }, e.Experimentation_Tests = function () {
                !function () {
                    let t = new a.Simplified_IO, e = (0, s.create_code_experiment_execution)({
                        experiment_name: "test",
                        seed: "42",
                        introduction_pages: (0, o.text_pages)(["blabla", "another blabla"]),
                        pre_run_instructions: (0, o.text_line)("blabla"),
                        finish_pages: (0, o.text_as_pages)("thanks"),
                        layout: [{variable: "Counter", treatments: ["1", "2", "3", "4", "5"]}],
                        repetitions: 1,
                        task_configuration: t => {
                            t.code = "Task " + t.treatment_combination[0].value, t.after_task_string = () => "Done " + t.code
                        },
                        output_object: t,
                        accepted_responses: ["1", "2", "3"],
                        finish_function: () => {
                        }
                    }), n = e.forwarders[0];
                    e.forwarders[1].experiment_definition, (0, r.guarantee_true)(0 == n.current_page), e.input("Enter")
                }(), function () {
                    let t = new a.Simplified_IO, e = (0, s.create_code_experiment_execution)({
                            experiment_name: "test",
                            seed: "42",
                            introduction_pages: (0, o.text_as_pages)("blabla"),
                            pre_run_instructions: (0, o.text_line)("blabl"),
                            finish_pages: (0, o.text_as_pages)("thanks"),
                            layout: [{variable: "Counter", treatments: ["1", "2", "3", "4", "5"]}],
                            repetitions: 1,
                            task_configuration: t => {
                                t.code = "Task " + t.treatment_combination[0].value, t.after_task_string = () => "Done " + t.code
                            },
                            output_object: t,
                            accepted_responses: ["1", "2", "3"],
                            finish_function: t => {
                            }
                        }), n = e.forwarders[1].experiment_definition, i = t => n.tasks[t], _ = i(0).code,
                        u = i(0).after_task_string(), c = i(1).code,
                        T = (i(1).after_task_string(), i(2).code, i(2).after_task_string(), i(3).code, i(3).after_task_string(), i(4).code, i(4).after_task_string());
                    (0, r.guarantee_true)("blabla" == t.output_string), e.input("Enter"), (0, r.guarantee_true)(t.output_string == _), e.input("Enter"), (0, r.guarantee_true)(t.output_string == _), e.input("1"), (0, r.guarantee_true)(t.output_string == u), e.input("Enter"), (0, r.guarantee_true)(t.output_string == c), e.input_sequence(["2", "Enter", "1", "Enter", "1", "Enter", "1"]), (0, r.guarantee_true)(t.output_string == T)
                }()
            }
        }, 462: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Code_Task = e.Task = e.init = void 0;
            const i = n(413), r = n(445);
            e.init = function () {
            };

            class s {
                constructor(t, e) {
                    this.expected_answer = "", this.given_answer = "", this.required_miliseconds = null, this.task_number_in_execution = -1, this.treatment_combination = t, this.experiment_definition = e
                }

                is_treatment_combination(t) {
                    for (var e of this.treatment_combination) {
                        if (e.value != t[0]) return !1;
                        t = t.slice(1)
                    }
                    return !0
                }
            }

            e.Task = s, e.Code_Task = class extends s {
                constructor(t, e, n) {
                    super(t, e), this.code = "", this.after_task_string = () => this.code, this.code = n
                }

                print_task_on(t) {
                    t.write(r.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, r.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, (0, i.code_line)(this.code)), t.write(r.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, r.AUTOMATA_OUTPUT_WRITER_TAGS.TASK, (0, i.text_line)("Task " + this.task_number_in_execution + " / " + this.experiment_definition.tasks.length))
                }

                print_between_tasks(t) {
                    t.write(r.AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, r.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, (0, i.text_line)(this.after_task_string()))
                }
            }
        }, 993: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Training_Experiment_Execution_Forwarder = void 0;
            const i = n(513), r = n(389), s = n(413), o = n(445), a = n(688), _ = n(686);

            class u extends a.Automata_With_Output_Forwarder {
                current_task() {
                    return this.experiment_definition.tasks[this.current_task_index]
                }

                constructor(t, e, n, i, r) {
                    super(t, i, r, e), this.current_task_index = 0, this.start_time = (new Date).getTime().valueOf(), this.end_time = (new Date).getTime().valueOf(), this.accepted_experiment_responses = r, this.experiment_definition = n, this.show_task_function = t => {
                        t.print_task_on(i), this.start_time = (new Date).getTime().valueOf()
                    }, this.create_and_init_automata(), this.set_active()
                }

                clean_task_in_output() {
                    this.output_writer.write(o.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, o.AUTOMATA_OUTPUT_WRITER_TAGS.TASK, (0, s.text_line)(""))
                }

                print_finish_training_session_text() {
                    this.clean_task_in_output(), this.output_writer.write(o.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, o.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, (0, s.text_line)("You finished this training session.\n\n Press [E] (capital E!) if you want to start the experiment.\n\nPress [Enter] if you want to do another training session."))
                }

                print_cancel_text() {
                    this.clean_task_in_output(), this.output_writer.write(o.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, o.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, (0, s.text_line)("You cancelled this training session.\n\n Press [E] (capital E!) if you want to start with the experiment:\n\nPress [Enter] if you want to start with another training session."))
                }

                set_active() {
                    console.log("set active was called"), super.set_active(), this.experiment_definition.init_experiment("" + (0, _.new_random_integer)(123456789)), this.current_task_index = 0, this.automata.initialize(), this.output_writer.write(o.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, o.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, (0, s.text_line)("The training can be cancelled by pressing [Esc].\n\nThe training starts when you press [Return]."))
                }

                create_and_init_automata() {
                    this.automata = (0, i.create_automata)([0, 1, 2, 3, 4, 5, 6], 0, (() => {
                    }), [(0, r.from)(0).to(1).on("Enter").do((t => {
                        this.output_writer.write(o.AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, o.AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, this.pre_run_instructions)
                    })), (0, r.from)(1).to(2).on("Enter").if((() => !0)).do((t => {
                        this.current_task().print_task_on(this.output_writer)
                    })), (0, r.from)(1).to(5).on("Escape").if((() => !0)).do((t => {
                        this.print_cancel_text()
                    })), (0, r.from)(2).to(3).on_any(this.accepted_experiment_responses).if((() => this.current_task_index < this.experiment_definition.tasks.length - 1)).do((t => {
                        this.current_task().given_answer = t, this.current_task().print_between_tasks(this.output_writer)
                    })), (0, r.from)(2).to(5).on("Escape").if((() => this.current_task_index < this.experiment_definition.tasks.length - 1)).do((t => {
                        this.print_cancel_text()
                    })), (0, r.from)(3).to(2).on("Enter").if((() => this.current_task_index < this.experiment_definition.tasks.length - 1)).do((t => {
                        this.current_task_index++, this.current_task().print_task_on(this.output_writer)
                    })), (0, r.from)(3).to(5).on("Escape").if((() => this.current_task_index < this.experiment_definition.tasks.length - 1)).do((t => {
                        this.print_cancel_text()
                    })), (0, r.from)(2).to(4).on_any(this.accepted_experiment_responses).if((() => this.current_task_index == this.experiment_definition.tasks.length - 1)).do((t => {
                        this.current_task().given_answer = t, this.current_task().print_between_tasks(this.output_writer)
                    })), (0, r.from)(4).to(6).on("Enter").do((() => {
                        this.print_finish_training_session_text()
                    })), (0, r.from)(6).to(7).on("E").do((() => {
                    })), (0, r.from)(6).to(0).on("Enter").do((() => {
                        this.set_active()
                    })), (0, r.from)(4).to(5).on("Escape").do((() => {
                        this.print_cancel_text()
                    })), (0, r.from)(5).to(7).on("E").do((() => {
                    })), (0, r.from)(5).to(0).on("Enter").do((() => {
                        this.set_active()
                    }))], [7]), this.automata.initialize()
                }
            }

            e.Training_Experiment_Execution_Forwarder = u
        }, 332: (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Treatment = e.init = void 0, e.init = function () {
            }, e.Treatment = class {
                constructor(t, e) {
                    this.variable = t, this.value = e
                }
            }
        }, 986: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.Variable = e.init = void 0;
            const i = n(332);
            e.init = function () {
            }, e.Variable = class {
                constructor(t, e) {
                    this.treatments = [], this.name = t;
                    for (let t of e) this.treatments.push(new i.Treatment(this, t))
                }

                all_treatment_combinations_do(t, e, n) {
                    for (var i of this.treatments) {
                        let r = t.slice();
                        r.push(i), 0 == e.length ? n(r) : e[0].all_treatment_combinations_do(r, e.slice(1), n)
                    }
                }
            }
        }, 800: (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.create_browser_server_text_experiment = void 0;
            const i = n(997), r = n(240), s = n(413), o = n(445);
            e.create_browser_server_text_experiment = function (t) {
                let e = (0, i.create_code_experiment_execution)({
                    experiment_name: t.experiment_name,
                    seed: t.seed,
                    introduction_pages: t.introduction_pages.map((t => new s.IO_Object([{
                        text: t,
                        format: o.AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT
                    }]))),
                    pre_run_instructions: new s.IO_Object([{
                        text: t.pre_run_instruction,
                        format: o.AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT
                    }]),
                    finish_pages: t.finish_pages.map((t => new s.IO_Object([{
                        text: t,
                        format: o.AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT
                    }]))),
                    layout: t.layout,
                    repetitions: t.repetitions,
                    task_configuration: t.task_configuration,
                    output_object: new o.Browser_IO,
                    accepted_responses: t.accepted_responses,
                    finish_function: e => {
                        let n = e.generate_csv_data();
                        (0, r.save_file_in_html)(t.experiment_name + "_results.csv", n)
                    }
                });
                document.addEventListener("keydown", (t => {
                    let n = (0, r.key_event_string)(t);
                    e.input(n)
                }), !1)
            }
        }, 240: (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0}), e.upload_experiment_to_server = e.add_upload_push_button = e.save_file_in_html = e.array_to_sequence_of_size_ = e.key_event_string = e.string_to_html = e.guarantee_true = e.guarantee_test = e.contains = e.init = void 0, e.init = function () {
            }, e.contains = function (t, e) {
                return -1 != t.indexOf(e)
            }, e.guarantee_test = function (t) {
                if (!t()) throw "Something is wrong here"
            }, e.guarantee_true = function (t) {
                if (!t) throw "Something is wrong here"
            }, e.string_to_html = function (t) {
                return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\n/g, "<br/>").replace(/ /g, "&nbsp;")
            }, e.key_event_string = function (t) {
                var e = "";
                return "Alt" != t.key && t.ctrlKey ? "Alt+Ctrl" : "Control" != t.key && t.altKey ? "Ctrl+Alt" : (e += t.altKey ? "+Alt" : "", e += t.ctrlKey ? "+Control" : "", "Alt" == t.key ? "Alt" : "" + t.key + e)
            }, e.array_to_sequence_of_size_ = function (t) {
                var e = [], n = 0;
                for (var i of t) e.push(n), n++;
                return e
            }, e.save_file_in_html = function (t, e) {
                const n = new Blob(e, {type: "application/ssc"}), i = window.document.createElement("a");
                i.href = window.URL.createObjectURL(n), i.download = t, document.body.appendChild(i), i.click(), document.body.removeChild(i)
            }, e.add_upload_push_button = function (t, e, n) {
                const i = window.document.createElement("form");
                i.setAttribute("action", t), i.setAttribute("method", "post");
                const r = window.document.createElement("input");
                r.setAttribute("name", "data"), r.setAttribute("type", "hidden"), r.setAttribute("value", n), i.appendChild(r);
                const s = window.document.createElement("input");
                s.setAttribute("value", e), s.setAttribute("type", "submit"), i.appendChild(s), document.body.appendChild(i)
            }, e.upload_experiment_to_server = function (t) {
                t.generate_csv_data();
                let e = window.location.href;
                console.log(e)
            }
        }, 377: (t, e, n) => {
            var i = n(832), r = n(652), s = n(801), o = n(30), a = n(618), _ = n(49), u = n(971);
            u.alea = i, u.xor128 = r, u.xorwow = s, u.xorshift7 = o, u.xor4096 = a, u.tychei = _, t.exports = u
        }, 832: function (t, e, n) {
            var i;
            !function (t, r, s) {
                function o(t) {
                    var e, n = this, i = (e = 4022871197, function (t) {
                        t = String(t);
                        for (var n = 0; n < t.length; n++) {
                            var i = .02519603282416938 * (e += t.charCodeAt(n));
                            i -= e = i >>> 0, e = (i *= e) >>> 0, e += 4294967296 * (i -= e)
                        }
                        return 2.3283064365386963e-10 * (e >>> 0)
                    });
                    n.next = function () {
                        var t = 2091639 * n.s0 + 2.3283064365386963e-10 * n.c;
                        return n.s0 = n.s1, n.s1 = n.s2, n.s2 = t - (n.c = 0 | t)
                    }, n.c = 1, n.s0 = i(" "), n.s1 = i(" "), n.s2 = i(" "), n.s0 -= i(t), n.s0 < 0 && (n.s0 += 1), n.s1 -= i(t), n.s1 < 0 && (n.s1 += 1), n.s2 -= i(t), n.s2 < 0 && (n.s2 += 1), i = null
                }

                function a(t, e) {
                    return e.c = t.c, e.s0 = t.s0, e.s1 = t.s1, e.s2 = t.s2, e
                }

                function _(t, e) {
                    var n = new o(t), i = e && e.state, r = n.next;
                    return r.int32 = function () {
                        return 4294967296 * n.next() | 0
                    }, r.double = function () {
                        return r() + 11102230246251565e-32 * (2097152 * r() | 0)
                    }, r.quick = r, i && ("object" == typeof i && a(i, n), r.state = function () {
                        return a(n, {})
                    }), r
                }

                r && r.exports ? r.exports = _ : n.amdD && n.amdO ? void 0 === (i = function () {
                    return _
                }.call(e, n, e, r)) || (r.exports = i) : this.alea = _
            }(0, t = n.nmd(t), n.amdD)
        }, 49: function (t, e, n) {
            var i;
            !function (t, r, s) {
                function o(t) {
                    var e = this, n = "";
                    e.next = function () {
                        var t = e.b, n = e.c, i = e.d, r = e.a;
                        return t = t << 25 ^ t >>> 7 ^ n, n = n - i | 0, i = i << 24 ^ i >>> 8 ^ r, r = r - t | 0, e.b = t = t << 20 ^ t >>> 12 ^ n, e.c = n = n - i | 0, e.d = i << 16 ^ n >>> 16 ^ r, e.a = r - t | 0
                    }, e.a = 0, e.b = 0, e.c = -1640531527, e.d = 1367130551, t === Math.floor(t) ? (e.a = t / 4294967296 | 0, e.b = 0 | t) : n += t;
                    for (var i = 0; i < n.length + 20; i++) e.b ^= 0 | n.charCodeAt(i), e.next()
                }

                function a(t, e) {
                    return e.a = t.a, e.b = t.b, e.c = t.c, e.d = t.d, e
                }

                function _(t, e) {
                    var n = new o(t), i = e && e.state, r = function () {
                        return (n.next() >>> 0) / 4294967296
                    };
                    return r.double = function () {
                        do {
                            var t = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21)
                        } while (0 === t);
                        return t
                    }, r.int32 = n.next, r.quick = r, i && ("object" == typeof i && a(i, n), r.state = function () {
                        return a(n, {})
                    }), r
                }

                r && r.exports ? r.exports = _ : n.amdD && n.amdO ? void 0 === (i = function () {
                    return _
                }.call(e, n, e, r)) || (r.exports = i) : this.tychei = _
            }(0, t = n.nmd(t), n.amdD)
        }, 652: function (t, e, n) {
            var i;
            !function (t, r, s) {
                function o(t) {
                    var e = this, n = "";
                    e.x = 0, e.y = 0, e.z = 0, e.w = 0, e.next = function () {
                        var t = e.x ^ e.x << 11;
                        return e.x = e.y, e.y = e.z, e.z = e.w, e.w ^= e.w >>> 19 ^ t ^ t >>> 8
                    }, t === (0 | t) ? e.x = t : n += t;
                    for (var i = 0; i < n.length + 64; i++) e.x ^= 0 | n.charCodeAt(i), e.next()
                }

                function a(t, e) {
                    return e.x = t.x, e.y = t.y, e.z = t.z, e.w = t.w, e
                }

                function _(t, e) {
                    var n = new o(t), i = e && e.state, r = function () {
                        return (n.next() >>> 0) / 4294967296
                    };
                    return r.double = function () {
                        do {
                            var t = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21)
                        } while (0 === t);
                        return t
                    }, r.int32 = n.next, r.quick = r, i && ("object" == typeof i && a(i, n), r.state = function () {
                        return a(n, {})
                    }), r
                }

                r && r.exports ? r.exports = _ : n.amdD && n.amdO ? void 0 === (i = function () {
                    return _
                }.call(e, n, e, r)) || (r.exports = i) : this.xor128 = _
            }(0, t = n.nmd(t), n.amdD)
        }, 618: function (t, e, n) {
            var i;
            !function (t, r, s) {
                function o(t) {
                    var e = this;
                    e.next = function () {
                        var t, n, i = e.w, r = e.X, s = e.i;
                        return e.w = i = i + 1640531527 | 0, n = r[s + 34 & 127], t = r[s = s + 1 & 127], n ^= n << 13, t ^= t << 17, n ^= n >>> 15, t ^= t >>> 12, n = r[s] = n ^ t, e.i = s, n + (i ^ i >>> 16) | 0
                    }, function (t, e) {
                        var n, i, r, s, o, a = [], _ = 128;
                        for (e === (0 | e) ? (i = e, e = null) : (e += "\0", i = 0, _ = Math.max(_, e.length)), r = 0, s = -32; s < _; ++s) e && (i ^= e.charCodeAt((s + 32) % e.length)), 0 === s && (o = i), i ^= i << 10, i ^= i >>> 15, i ^= i << 4, i ^= i >>> 13, s >= 0 && (o = o + 1640531527 | 0, r = 0 == (n = a[127 & s] ^= i + o) ? r + 1 : 0);
                        for (r >= 128 && (a[127 & (e && e.length || 0)] = -1), r = 127, s = 512; s > 0; --s) i = a[r + 34 & 127], n = a[r = r + 1 & 127], i ^= i << 13, n ^= n << 17, i ^= i >>> 15, n ^= n >>> 12, a[r] = i ^ n;
                        t.w = o, t.X = a, t.i = r
                    }(e, t)
                }

                function a(t, e) {
                    return e.i = t.i, e.w = t.w, e.X = t.X.slice(), e
                }

                function _(t, e) {
                    null == t && (t = +new Date);
                    var n = new o(t), i = e && e.state, r = function () {
                        return (n.next() >>> 0) / 4294967296
                    };
                    return r.double = function () {
                        do {
                            var t = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21)
                        } while (0 === t);
                        return t
                    }, r.int32 = n.next, r.quick = r, i && (i.X && a(i, n), r.state = function () {
                        return a(n, {})
                    }), r
                }

                r && r.exports ? r.exports = _ : n.amdD && n.amdO ? void 0 === (i = function () {
                    return _
                }.call(e, n, e, r)) || (r.exports = i) : this.xor4096 = _
            }(0, t = n.nmd(t), n.amdD)
        }, 30: function (t, e, n) {
            var i;
            !function (t, r, s) {
                function o(t) {
                    var e = this;
                    e.next = function () {
                        var t, n, i = e.x, r = e.i;
                        return t = i[r], n = (t ^= t >>> 7) ^ t << 24, n ^= (t = i[r + 1 & 7]) ^ t >>> 10, n ^= (t = i[r + 3 & 7]) ^ t >>> 3, n ^= (t = i[r + 4 & 7]) ^ t << 7, t = i[r + 7 & 7], n ^= (t ^= t << 13) ^ t << 9, i[r] = n, e.i = r + 1 & 7, n
                    }, function (t, e) {
                        var n, i = [];
                        if (e === (0 | e)) i[0] = e; else for (e = "" + e, n = 0; n < e.length; ++n) i[7 & n] = i[7 & n] << 15 ^ e.charCodeAt(n) + i[n + 1 & 7] << 13;
                        for (; i.length < 8;) i.push(0);
                        for (n = 0; n < 8 && 0 === i[n]; ++n) ;
                        for (8 == n ? i[7] = -1 : i[n], t.x = i, t.i = 0, n = 256; n > 0; --n) t.next()
                    }(e, t)
                }

                function a(t, e) {
                    return e.x = t.x.slice(), e.i = t.i, e
                }

                function _(t, e) {
                    null == t && (t = +new Date);
                    var n = new o(t), i = e && e.state, r = function () {
                        return (n.next() >>> 0) / 4294967296
                    };
                    return r.double = function () {
                        do {
                            var t = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21)
                        } while (0 === t);
                        return t
                    }, r.int32 = n.next, r.quick = r, i && (i.x && a(i, n), r.state = function () {
                        return a(n, {})
                    }), r
                }

                r && r.exports ? r.exports = _ : n.amdD && n.amdO ? void 0 === (i = function () {
                    return _
                }.call(e, n, e, r)) || (r.exports = i) : this.xorshift7 = _
            }(0, t = n.nmd(t), n.amdD)
        }, 801: function (t, e, n) {
            var i;
            !function (t, r, s) {
                function o(t) {
                    var e = this, n = "";
                    e.next = function () {
                        var t = e.x ^ e.x >>> 2;
                        return e.x = e.y, e.y = e.z, e.z = e.w, e.w = e.v, (e.d = e.d + 362437 | 0) + (e.v = e.v ^ e.v << 4 ^ t ^ t << 1) | 0
                    }, e.x = 0, e.y = 0, e.z = 0, e.w = 0, e.v = 0, t === (0 | t) ? e.x = t : n += t;
                    for (var i = 0; i < n.length + 64; i++) e.x ^= 0 | n.charCodeAt(i), i == n.length && (e.d = e.x << 10 ^ e.x >>> 4), e.next()
                }

                function a(t, e) {
                    return e.x = t.x, e.y = t.y, e.z = t.z, e.w = t.w, e.v = t.v, e.d = t.d, e
                }

                function _(t, e) {
                    var n = new o(t), i = e && e.state, r = function () {
                        return (n.next() >>> 0) / 4294967296
                    };
                    return r.double = function () {
                        do {
                            var t = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21)
                        } while (0 === t);
                        return t
                    }, r.int32 = n.next, r.quick = r, i && ("object" == typeof i && a(i, n), r.state = function () {
                        return a(n, {})
                    }), r
                }

                r && r.exports ? r.exports = _ : n.amdD && n.amdO ? void 0 === (i = function () {
                    return _
                }.call(e, n, e, r)) || (r.exports = i) : this.xorwow = _
            }(0, t = n.nmd(t), n.amdD)
        }, 971: function (t, e, n) {
            var i;
            !function (r, s, o) {
                var a, _ = 256, u = o.pow(_, 6), c = o.pow(2, 52), T = 2 * c, h = _ - 1;

                function d(t, e, n) {
                    var i = [],
                        h = A(f((e = 1 == e ? {entropy: !0} : e || {}).entropy ? [t, m(s)] : null == t ? function () {
                            try {
                                var t;
                                return a && (t = a.randomBytes) ? t = t(_) : (t = new Uint8Array(_), (r.crypto || r.msCrypto).getRandomValues(t)), m(t)
                            } catch (t) {
                                var e = r.navigator, n = e && e.plugins;
                                return [+new Date, r, n, r.screen, m(s)]
                            }
                        }() : t, 3), i), d = new p(i), x = function () {
                            for (var t = d.g(6), e = u, n = 0; t < c;) t = (t + n) * _, e *= _, n = d.g(1);
                            for (; t >= T;) t /= 2, e /= 2, n >>>= 1;
                            return (t + n) / e
                        };
                    return x.int32 = function () {
                        return 0 | d.g(4)
                    }, x.quick = function () {
                        return d.g(4) / 4294967296
                    }, x.double = x, A(m(d.S), s), (e.pass || n || function (t, e, n, i) {
                        return i && (i.S && l(i, d), t.state = function () {
                            return l(d, {})
                        }), n ? (o.random = t, e) : t
                    })(x, h, "global" in e ? e.global : this == o, e.state)
                }

                function p(t) {
                    var e, n = t.length, i = this, r = 0, s = i.i = i.j = 0, o = i.S = [];
                    for (n || (t = [n++]); r < _;) o[r] = r++;
                    for (r = 0; r < _; r++) o[r] = o[s = h & s + t[r % n] + (e = o[r])], o[s] = e;
                    (i.g = function (t) {
                        for (var e, n = 0, r = i.i, s = i.j, o = i.S; t--;) e = o[r = h & r + 1], n = n * _ + o[h & (o[r] = o[s = h & s + e]) + (o[s] = e)];
                        return i.i = r, i.j = s, n
                    })(_)
                }

                function l(t, e) {
                    return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e
                }

                function f(t, e) {
                    var n, i = [], r = typeof t;
                    if (e && "object" == r) for (n in t) try {
                        i.push(f(t[n], e - 1))
                    } catch (t) {
                    }
                    return i.length ? i : "string" == r ? t : t + "\0"
                }

                function A(t, e) {
                    for (var n, i = t + "", r = 0; r < i.length;) e[h & r] = h & (n ^= 19 * e[h & r]) + i.charCodeAt(r++);
                    return m(e)
                }

                function m(t) {
                    return String.fromCharCode.apply(0, t)
                }

                if (A(o.random(), s), t.exports) {
                    t.exports = d;
                    try {
                        a = n(42)
                    } catch (t) {
                    }
                } else void 0 === (i = function () {
                    return d
                }.call(e, n, e, t)) || (t.exports = i)
            }("undefined" != typeof self ? self : this, [], Math)
        }, 42: () => {
        }
    }, e = {};

    function n(i) {
        var r = e[i];
        if (void 0 !== r) return r.exports;
        var s = e[i] = {id: i, loaded: !1, exports: {}};
        return t[i].call(s.exports, s, s.exports, n), s.loaded = !0, s.exports
    }

    n.amdD = function () {
        throw new Error("define cannot be used indirect")
    }, n.amdO = {}, n.nmd = t => (t.paths = [], t.children || (t.children = []), t), (() => {
        "use strict";
        const t = n(800), e = n(686);
        document.experiment_definition = t.create_browser_server_text_experiment, document.new_random_integer = e.new_random_integer, document.set_seed = e.SET_SEED, document.nouns = new Nouns
    })()
})();