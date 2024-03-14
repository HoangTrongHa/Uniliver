import { defineStore } from 'pinia'
import { List } from 'postcss/lib/list'

interface FilterData {
    isLoading: boolean,
    isShowSearch?: boolean,
    form: {
        query?: string | null,
        type?: string | null,
        order?: string | null
    },
    isShowSuggestion: boolean,
    isShowAll: boolean,
    suggestions: List[],
    items: List[],
    types: List[],
    orders: List[]
}

export const useFilterStore = defineStore('filter', {
    state: (): FilterData => ({
        isLoading: false,
        isShowSearch: false,
        form: {
            query: null,
            type:null,
            order:null
        },
        isShowSuggestion: false,
        isShowAll: false,
        suggestions: [],
        items: [],
        types: [
            {
                value: "pdf",
                label: "PDF"
            },
            {
                value: "news",
                label: "Новости"
            },
        ],
        orders: [
            {
                value: "asc",
                label: "Старые публикации"
            },
            {
                value: "desc",
                label: "Новые публикации"
            },
        ]
    }),
    actions: {
        setIsShowSearch(value: boolean) {
            this.isShowSearch = value
        },
        setIsShowSuggestion(value: boolean) {
            this.isShowSuggestion = value
        },
        setIsShowAll(value: boolean) {
            this.isShowAll = value
        },
        setFormByKey(key: any, value: any) {
            this.form[key] = value
        },
        setQuery(value: string | null) {
            this.form.query = value
        },
        setType(value: string | null) {
            this.form.type = value
        },
        setOrder(value: string | null) {
            this.form.order = value
        },
        async search (isSuggest: boolean = false) {
            try {
                if(this.form?.query?.length > 1) {
                    if(!isSuggest) {
                        this.isLoading = true
                    }

                    const { result } = await useApiFetch('static.search', {
                        query: this.form.query,
                        type: this.form.type ? this.form.type : 'news',
                        order: this.form.order ? this.form.order : 'asc',
                    })

                    this.suggestions = result.result
                    if(!isSuggest) {
                        this.items = result.result
                    }

                    this.isLoading = false

                    return result
                }
            } catch (e) {
                console.error(e)
                this.isLoading = false

                return null
            }
        }
    }
})
