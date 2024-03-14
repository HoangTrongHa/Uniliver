import { defineStore } from 'pinia'

interface Crumb {
    path: string
    name: string
}

interface Setting {
    breadcrumbs: Array<Crumb>,
    keyword?: string
    currentPath?: string
    advanced?: boolean
}

export const useBreadcrumbStore = defineStore('breadcrumb', {
    state: () => {
        return {
            settings: {
                breadcrumbs: [],
                keyword: null,
                currentPath: "",
                advanced: false
            },
            data: [
                {
                    title: "Один из ведущих мировых брендов OMO теперь в России",
                    time: "15 июня 2020",
                    description:
                        "Компания импортирует продукцию бренда из Вьетнама, адаптировав продукт под особенности российского рынка",
                    type: "Page",
                },
                {
                    title: "За кулисами омской фабрики мороженого",
                    time: "15 июня 2020",
                    description: "Объем инвестиций в этот проект — порядка 6 млн евро.",
                },
                {
                    title: "Unilever выявил эффективность формулы ополаскивателя для полости рта «Лесной бальзам» в подавлении активности штамма вируса SARS-CoV-2 на 99,9%",
                    time: "15 июня 2020",
                    description:
                        "Unilever выявил эффективность формулы ополаскивателя для полости рта «Лесной бальзам» в подавлении активности штамма вируса SARS-CoV-2 на 99,9%",
                    type: "Page",
                },
                {
                    title: "В семье не без урока: бренд Dove запустил шоу о проблеме формирования комплексов у подростков",
                    time: "15 июня 2020",
                    description: "",
                    type: "Page",
                },
                {
                    title: "СОУТ ОП Инмарко-Трейд Самара 2021 (PDF 406.8 KB)",
                    time: "",
                    description:
                        "Компания импортирует продукцию бренда из Вьетнама, адаптировав продукт под особенности российского рынка",
                    type: "Pdf",
                },
                {
                    title: "За кулисами омской фабрики мороженого",
                    time: "15 июня 2020",
                    description: "Объем инвестиций в этот проект — порядка 6 млн евро.",
                    type: "Page",
                },
                {
                    title: "Unilever выявил эффективность формулы ополаскивателя для полости рта «Лесной бальзам» в подавлении активности штамма вируса SARS-CoV-2 на 99,9%",
                    time: "15 июня 2020",
                    description:
                        "Unilever выявил эффективность формулы ополаскивателя для полости рта «Лесной бальзам» в подавлении активности штамма вируса SARS-CoV-2 на 99,9%.",
                    type: "Page",
                },
                {
                    title: "СОУТ ОП Инмарко-Трейд Самара 2021 (PDF 406.8 KB)",
                    time: "",
                    description:
                        "Компания импортирует продукцию бренда из Вьетнама, адаптировав продукт под особенности российского рынка",
                    type: "Pdf",
                },
                {
                    title: "В семье не без урока: бренд Dove запустил шоу о проблеме формирования комплексов у подростков",
                    time: "15 июня 2020",
                    description: "",
                    type: "Page",
                },
                {
                    title: "В семье не без урока: бренд Dove запустил шоу о проблеме формирования комплексов у подростков",
                    time: "15 июня 2020",
                    description: "",
                    type: "Page",
                },
            ],
        }
    },
    actions: {
        setSetting(settings: Setting) {
            return this.settings = settings
        }
    }
})