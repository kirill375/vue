Vue.component('card', {
    props: ["item"],
    template: `
				<div class="uk-card  uk-card-default uk-card-body uk-width-1-3 uk-flex uk-flex-column uk-flex-middle">
				    
				    <img :src="item.img" :alt="item.brend" class="uk-height-small" :title="item.brend">
				    <h3 class="uk-card-title ">{{item.brend}}</h3>
				    <p class="uk-margin-auto-top">{{priceFormatting}}</p>
                    <button class="uk-button uk-button-default ">Купить</button>
                </div>
			
			`,
    computed: {
        priceFormatting() {
            return this.item.price.toLocaleString() + " руб"
        }
    }
})

var carsList = [
    {
        img: `https://im0-tub-ru.yandex.net/i?id=885da0c40c4f6c4f56c7f0d40234f09f&n=13&exp=1`,
        brend: "BMW i750",
        price: 500000
            },
    {
        img: `https://im0-tub-ru.yandex.net/i?id=885da0c40c4f6c4f56c7f0d40234f09f&n=13&exp=1`,
        brend: "BMW i765",
        price: 760000
            },
    {
        img: `https://im0-tub-ru.yandex.net/i?id=3caed7b8ef9ce3bf57dc68d5116fbf81-sr&n=13&exp=1`,
        brend: "BMW i335",
        price: 400000
            },
    {
        img: `https://im0-tub-ru.yandex.net/i?id=3caed7b8ef9ce3bf57dc68d5116fbf81-sr&n=13&exp=1`,
        brend: "BMW i335",
        price: 450000
            },
    {
        img: `http://plasticmotors.ru/wp-content/uploads/2015/9/audi-sdelaet-samoe-moshhnoe-kupe-tt-eshhe-moshhnee_1.png`,
        brend: "AUDI TT",
        price: 500000
            },
    {
        img: `http://d2fzjegv0xpec1.cloudfront.net/thumbnail/6935207a-2b72-4e3b-9392-7d8fb8def7ee.png`,
        brend: "AUDI A3",
        price: 600000
            },
    {
        img: `http://autodomkst.kz/assets/components/phpthumbof/cache/a5coupe.b0f6a273b3aaae5686980080448c1bd3546.png`,
        brend: "AUDI A5",
        price: 850000
            },
    {
        img: ` https://im0-tub-ru.yandex.net/i?id=ff467a39f0d635162862447abacfabfe&n=13&exp=1`,
        brend: "AUDI TT",
        price: 1200000
            },
    {
        img: `http://freebiefairies.com/wp-content/uploads/2016/04/download-7-300x164.jpeg`,
        brend: "BMW i320",
        price: 300000
            },
    {
        img: `http://i.artfile.ru/s/456701_230109_80_ArtFile_ru.jpg`,
        brend: "Bentley",
        price: 1000000
            },
    {
        img: `https://img-fotki.yandex.ru/get/198613/289474118.11aa/0_17d6e4_2cf16958_L`,
        brend: "Mercedes E300",
        price: 600000
            },
    {
        img: `https://cnet3.cbsistatic.com/img/1U-TFE5EYTLR3kZGXPunPOWcWrw=/300x225/2011/11/15/f7dd9717-6531-4732-a477-ebcb27d428b0/2011MEB014a_640_03.png`,
        brend: "Mercedes GLK 300",
        price: 1600000
            },
    {
        img: `https://2.bp.blogspot.com/-shqNuQMusZE/WKztVWkIY4I/AAAAAAAAAKA/GLyMcLIZTHok19fAoAy3zI3PvHt2QIVAwCLcB/s400/Mercedes-A250-1.png`,
        brend: "Mercedes a200",
        price: 500000
            },
    {
        img: `https://www.sektor.gen.tr/image/antalya-rent-a-car-antalya-rent-a-car-6-biten-mercedes.png`,
        brend: "Mercedes c180",
        price: 700000
            },
    {
        img: `https://im0-tub-ru.yandex.net/i?id=b8e3d3159ef685d3abbed860cb3d8b0d&n=13&exp=1`,
        brend: "Mercedes c300",
        price: 800000
            }
        ];


var sample = new Vue({
    el: "#sample",
    data: {

        cars: carsList,
        search: "",
        priceFrom: "",
        priceTo: "",
        brands: []
    },
    methods: {

        filterCars() {

            /* search*/
            var masCras = [];
            var newPriceTo = this.priceTo || Infinity;
            var newPriceFrom = this.priceFrom || 0;


            if (this.search == "" && this.brands.length == 0 && this.priceFrom == "" && this.priceTo == "") {
                this.cars = carsList;
                return
            }

            if (this.search) {
                masCras = masCras.concat(carsList.filter((item) => {


                    return item.brend.toLowerCase().includes(this.search.toLocaleLowerCase())

                }));

                if (!masCras.length) {
                    this.cars = masCras;
                    return
                }
            }

            /* checkbox*/
            if (masCras.length && this.brands.length) {
                var temp = [];

                for (var i = 0; i < this.brands.length; i++) {
                    temp = temp.concat(masCras.filter((item) => {
                        return item.brend.includes(this.brands[i])
                    }));

                }
                masCras = temp;

            } else {

                for (var i = 0; i < this.brands.length; i++) {
                    masCras = masCras.concat(carsList.filter((item) => {
                        return item.brend.includes(this.brands[i])
                    }));
                    console.log(masCras);
                }
            }



            /* form*/

            if (masCras.length) {


                masCras = masCras.filter((item) => {
                    if (newPriceFrom <= item.price && newPriceTo >= item.price) {
                        return true
                    }
                });


            } else {

                console.log(newPriceFrom, newPriceTo);
                masCras = masCras.concat(carsList.filter((item) => {
                    if (newPriceFrom <= item.price && newPriceTo >= item.price) {
                        return true
                    }

                }));
            }
            this.cars = masCras;
        },


        priceReformat(e) {
            var price = 0;
            var target = e.target;

            if (target.value == "") {
                target.value = "";

            } else {
                price = +target.value.replace(/\D/g, '');
                target.value = price.toLocaleString();
            }
            if (target.dataset.price == "priceTo") {
                this.priceTo = price;

            } else {
                this.priceFrom = price;
            }

        }
    }

})
