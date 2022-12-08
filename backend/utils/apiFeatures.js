class apiFeatures{
    constructor(Product,query){
        this.Product=Product;
        this.query=query;
    }

    search(){
        const keyword=this.query.keyword ? {
            name:{
                $regex:this.query.keyword,
                $options:"i"
            }
        }:{};

        this.Product=this.Product.find(keyword);
        // return this;
    }

    pagination(itemsPerPage){
        const currentPage=Number(this.query.page) || 1;
        const skip=itemsPerPage*(currentPage-1);
        this.Product=this.Product.limit(itemsPerPage).skip(skip);
    }

    
}

module.exports=apiFeatures;