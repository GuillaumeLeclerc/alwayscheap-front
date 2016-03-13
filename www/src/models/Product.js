import _ from 'lodash'

class Product {
  constructor(id, count=1, infos) {
    this.id = parseInt(id);
    this.count = count;

    if (!infos) {
      this.loading = true;
      this.image = "http://image.migros.ch/fsicache/server?type=image&source=images%2Fmigros_api%2Fproduct_120267000000_e74fc5.jpg&width=500&height=500&renderer=original"
      this.title = "My id is " + id ;
      this.finalPrice = 0;
      this.startPrice = 0;
    } else {
      this.loading = false;
      this.image = 'http://' + (infos.image.replace('{width}', 50).replace('{height}', 50));
      this.startPrice = infos.price;
      this.reductions = infos.reductions;
      this.finalPrice = this.startPrice;
      console.log(this);
      _.each(this.reductions, (reduction) => {
        switch (reduction.mode) {
          case '*':
            if (reduction.value.length > 0) {
              var t = reduction.value;
              reduction.value = reduction.text;
              reduction.text = t;
            }
            console.log(reduction);
            this.finalPrice = this.finalPrice * (1.0-(reduction.value/100.0));
            break;
          case '+':
            this.finalPrice = this.finalPrice - reduction.value;
            break;
        }
      });
      console.log(this.finalPrice);
      this.title = infos.title;
    }
  }
}

export default Product;
