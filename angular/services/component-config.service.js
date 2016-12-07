export class ComponentConfigService{
    constructor($translatePartialLoader){
        'ngInject';

        //
        this.$translateLoader = $translatePartialLoader;
  
    }
    translate(part){
        this.$translatePartialLoader.addPart(part);
    }
}

