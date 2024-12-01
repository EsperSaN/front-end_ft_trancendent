export class APIs {
    constructor(names = [], apis = []) {
        this.apiMap = new Map();
        names.forEach((name, index) => {
            this.apiMap.set(name, apis[index]);
        });
    }

    add_api(name, api) {
        this.apiMap.set(name, api);
    }


    fetch_api(name)
    {
        try {
                const api = this.apiMap.get(name)
                if(!api) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                api.fetch_data();
        }  catch (error) {
            console.error(`Error in "${name}" API:`, error);
            throw error;
        }
    }
}