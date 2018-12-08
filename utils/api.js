class API_v1 {
        constructor(base_url='') {
            this.base_url = base_url;
        }

        /*
         * GET Routes
         */
        async getProfile(name = '') {
            let r = await fetch(`${this.base_url}?query=profile&name=${name}`)
            return r.json();
        }
        
        async getStore() {
            let r = await fetch(`${this.base_url}?query=store`)
            return r.json()
        }

        async getTasks() {
            let r = await fetch(`${this.base_url}?query=tasks`);
            return r.json();
        }

        async getTaskByID(id = 1) {
            let r = await fetch(`${this.base_url}?query=task&id=${id}`)
            return r.json()
        }

}