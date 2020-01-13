import lodash from 'lodash';

class PricingManager{
    getVatPercent(){
        return 0.2;
    }

    getApplicationPrice(name){
        switch(name){
            case 'rendezvous':
                return {
                    ttc : 100* (this.getVatPercent()+1),
                    ht : 100
                }
            case 'chatInstant':
                return {
                    ttc : 10* (this.getVatPercent()+1),
                    ht : 10
                }
            case 'employeemanagement':
                return {
                    ttc : 10* (this.getVatPercent()+1),
                    ht : 10
                }
            case 'packWebStandard':
                return {
                    ttc : 225* (this.getVatPercent()+1),
                    ht : 225
                }
            case 'logo':
                return {
                    ttc : 75* (this.getVatPercent()+1),
                    ht : 75
                }
            case 'carteVisite':
                return {
                    ttc : 50* (this.getVatPercent()+1),
                    ht : 50
                }
            case 'video':
                return {
                    ttc : 2000* (this.getVatPercent()+1),
                    ht : 2000
                }
            case 'siteVitrine':
                return {
                    ttc : 175* (this.getVatPercent()+1),
                    ht : 175
                }
            case 'siteEcommerce':
                return {
                    ttc : 2250* (this.getVatPercent()+1),
                    ht : 2250
                }
            default:
                return {
                    ttc : 100* (this.getVatPercent()+1),
                    ht : 100
                }
        }
    }

    computeOrderOrShoppingCartPrices(items,promotionCode){
        var subTotalHt = lodash.sumBy(items,i=>i.priceHt);
        var subTotalTtc = lodash.sumBy(items,i=>i.priceTtc);

        var totalHt = subTotalHt;
        var totalTtc = subTotalTtc;

        var totalDiscount = 0;

        if(promotionCode){
            totalHt = lodash.sumBy(items,i=>i.priceHt*(1-promotionCode.discountPercent/100));
            totalTtc = lodash.sumBy(items,i=>i.priceTtc*(1-promotionCode.discountPercent/100));
            totalDiscount = lodash.sumBy(items,i=>i.priceHt*(promotionCode.discountPercent/100));
        }

        return {subTotalHt,subTotalTtc,totalHt,totalTtc,totalDiscount};
    }

    getPlanPriceWithTtc(plan,duration) {
        var basePrice = this.getPlanPrice(plan,duration);
        return {ht:basePrice / (this.getVatPercent()+1), ttc: basePrice};
    }

    getPlanPrice(plan,duration){
        if(plan === "starter"){
            return 0;
        }
        if(plan === "comfort"){
            switch(duration){
                case 1:
                    return 30;
                    break;
                case 3:
                    return 85;
                    break;
                case 6:
                    return 150;
                    break;
                case 12:
                    return 300;
                    break;
                default:
                    return 30*duration;
            }
        }
        if(plan === "premium"){
            switch(duration){
                case 1:
                    return 45;
                    break;
                case 3:
                    return 105;
                    break;
                case 6:
                    return 200;
                    break;
                case 12:
                    return 400;
                    break;
                default:
                    return 45*duration;
            }
        }
    }
}

export default new PricingManager();