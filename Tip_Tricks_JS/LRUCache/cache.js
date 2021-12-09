class LRUCache{
    constructor(size){
        this.size = size || 3
        this.cache = new Map()
    }

    put(key,val){
        const hasKey = this.cache.has(key)
        if(hasKey){
            this.cache.delete(key)
        }
        this.cache.set(key,val)
        if(this.cache.size > this.size){
            this.cache.delete(this.cache.keys().next().value)
        }
        return true
    }

    get(key){
        const hasKey = this.cache.has(key)
        if(!hasKey){
            return -1
        }
        const val = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key,val)
        return val;
    }
    item(){
        return this.cache.entries()
    }
}