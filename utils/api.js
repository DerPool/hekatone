class API_v1 {
        constructor(base_url='') {
            this.base_url = base_url;
        }

        async getProfile() {
            let r = await fetch(`${this.base_url}?query=profile`)
            return r.json();
        }
        
        async getStore() {
            let r = await fetch(`${this.base_url}?query=store`)
            return r.json()
        }

        async getTasks() {
            let r = await fetch(`${this.base_url}?query=tasks`)
        }

        async getTaskByID(id = 0) {
            let r = await fetch(`${this.base_url}?query=task&id=${id}`)
        }


}