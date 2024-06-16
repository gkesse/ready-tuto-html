//===============================================
// GTree.js
//===============================================
class GTree {
    //===============================================
    static m_instance = null;
    //===============================================
    constructor() {
        this.m_index        = 0;
        this.m_parentIndex  = 0;
        this.m_name         = "";
        this.m_type         = "";
        this.m_map          = [];
    }
    //===============================================
    static Instance() {
        if(this.m_instance == null) {
            this.m_instance = new GTree();
        }
        return this.m_instance;
    }
    //===============================================
    init() {
        this.initTree();
        this.initArrows();
    }
    //===============================================
    initTree() {
        var lCarets = document.getElementsByClassName("tree3");
        for(var i = 0; i < lCarets.length; i++) {
            lCarets[i].addEventListener("click", this.onToogle);
        }

        var lDowns = document.getElementsByClassName("tree5");
        for(var i = 0; i < lDowns.length; i++) {
            lDowns[i].addEventListener("click", this.onDown);
        }

        var lUps = document.getElementsByClassName("tree6");
        for(var i = 0; i < lUps.length; i++) {
            lUps[i].addEventListener("click", this.onUp);
        }
    }
    //===============================================
    initArrows() {
        var lLis = document.querySelectorAll(".tree1");
        for(var i = 0; i < lLis.length; i++) {
            this.updateArrows(lLis[i]);
        }
    }
    //===============================================
    serialize() {
        return this.serializeJson();
    }
    //===============================================
    serializeJson() {
        var lDom = {};

        lDom["index"]                   = this.m_index;
        lDom["parent_index"]            = this.m_parentIndex;
        lDom["name"]                    = this.m_name;
        lDom["type"]                    = this.m_type;

        if(this.m_map.length) {
            var lMap = [];

            for(var i = 0; i < this.m_map.length; i++) {
                var lObj            = this.m_map[i];
                var lDom2           = {};

                lDom2["index"]          = lObj.m_index;
                lDom2["parent_index"]   = lObj.m_parentIndex;
                lDom2["name"]           = lObj.m_name;
                lDom2["type"]           = lObj.m_type;

                lMap.push(lDom2);
            }
            lDom["map"] = lMap;
        }
        return JSON.stringify(lDom, null, 2);
    }
    //===============================================
    deserialize(_data) {
        this.deserializeJson(_data);
    }
    //===============================================
    deserializeJson(_data) {
        var lDom                = JSON.parse(_data);

        this.m_index            = lDom["index"];
        this.m_parentIndex      = lDom["parent_index"];
        this.m_name             = lDom["name"];
        this.m_type             = lDom["type"];

        var lMap                = lDom["map"] || [];

        for(var i = 0; i < lMap.length; i++) {
            var lDom2           = lMap[i];
            var lObj            = new GTree();

            lObj.m_index        = lDom2["index"];
            lObj.m_parentIndex  = lDom2["parent_index"];
            lObj.m_name         = lDom2["name"];
            lObj.m_type         = lDom2["type"];

            this.m_map.push     (lObj);
        }
    }
    //===============================================
    onToogle(e) {
        this.classList.toggle("down");
        var lLiMenu = this.parentElement.querySelector(".tree2");
        lLiMenu.classList.toggle("active");
        GTree.Instance().updateArrows(lLiMenu);
    }
    //===============================================
    onDown(e) {
        e.stopPropagation();
        var lLiCurrent = e.target.parentElement;
        if(lLiCurrent.classList.contains("tree3")) {
            lLiCurrent = lLiCurrent.parentElement;
        }
        var lLiParent = lLiCurrent.parentElement;
        var lLiDown = lLiCurrent.nextElementSibling;
        if(!lLiDown) {
            console.warn("Erreur l'élément en cours est le plus bas.");
            return;
        }
        var lLiBefore = lLiDown.nextElementSibling;
        lLiParent.removeChild(lLiCurrent);
        lLiParent.insertBefore(lLiCurrent, lLiBefore);
        GTree.Instance().updateArrows(lLiParent);
    }
    //===============================================
    onUp(e) {
        e.stopPropagation();
        var lLiCurrent = e.target.parentElement;
        if(lLiCurrent.classList.contains("tree3")) {
            lLiCurrent = lLiCurrent.parentElement;
        }
        var lLiParent = lLiCurrent.parentElement;
        var lLiUp = lLiCurrent.previousElementSibling;
        if(!lLiUp) {
            console.warn("Erreur l'élément en cours est le plus haut.");
            return;
        }
        lLiParent.removeChild(lLiCurrent);
        lLiParent.insertBefore(lLiCurrent, lLiUp);
        GTree.Instance().updateArrows(lLiParent);
    }
    //===============================================
    showArrows(_parent) {
        var lLis = _parent.querySelectorAll(":scope > li > .tree3, :scope > .tree4");
        for(var i = 0; i < lLis.length; i++) {
            var lLiCurrent = lLis[i];
            var lLiDown = lLiCurrent.querySelector(".tree5");
            var lLiUp = lLiCurrent.querySelector(".tree6");
            lLiDown.classList.remove("hide");
            lLiUp.classList.remove("hide");
        }
    }
    //===============================================
    updateArrows(_parent) {
        this.showArrows(_parent);
        var lLis = _parent.querySelectorAll(":scope > li > .tree3, :scope > .tree4");
        for(var i = 0; i < lLis.length; i++) {
            var lLiCurrent = lLis[i];
            var lLiDown = lLiCurrent.querySelector(".tree5");
            var lLiUp = lLiCurrent.querySelector(".tree6");
            if(lLiCurrent.classList.contains("tree3")) {
                lLiCurrent = lLiCurrent.parentElement;
            }
            if(!lLiCurrent.nextElementSibling) {
                lLiDown.classList.add("hide");
            }
            if(!lLiCurrent.previousElementSibling) {
                lLiUp.classList.add("hide");
            }
        }
    }
    //===============================================
    readTree(_parent) {
        var lParent = document.querySelector(_parent);
        var lLis = lParent.querySelectorAll(":scope > li > .tree3, :scope > .tree4");
        for(var i = 0; i < lLis.length; i++) {
            var lLi = lLis[i];
            if(lLi.classList.contains("tree3")) {
                console.log(sprintf("%s", lLi.dataset.value));
                var lObj            = new GTree();
                lObj.setIndex       (this.size() + 1);
                lObj.setParentIndex (this.getIndex());
                lObj.setName        (lLi.dataset.value);
                lObj.setType        ("dir");
                this.add            (lObj);
                this.readItem(lObj, lLi.nextElementSibling, "    ");
            }
            else {
                console.log(sprintf("%s", lLi.dataset.value));
                var lObj            = new GTree();
                lObj.setIndex       (this.size() + 1);
                lObj.setParentIndex (this.getIndex());
                lObj.setName        (lLi.dataset.value);
                lObj.setType        ("file");
                this.add            (lObj);
            }
        }
    }
    //===============================================
    readItem(_obj, _parent, _shift) {
        var lLis = _parent.querySelectorAll(":scope > li > .tree3, :scope > .tree4");
        for(var i = 0; i < lLis.length; i++) {
            var lLi = lLis[i];
            if(lLi.classList.contains("tree3")) {
                console.log(sprintf("%s%s", _shift, lLi.dataset.value));
                var lObj            = new GTree();
                lObj.setIndex       (this.size() + 1);
                lObj.setParentIndex (_obj.getIndex());
                lObj.setName        (lLi.dataset.value);
                lObj.setType        ("dir");
                this.add            (lObj);
                this.readItem(lObj, lLi.nextElementSibling, _shift + "    ");
            }
            else {
                console.log(sprintf("%s%s", _shift, lLi.dataset.value));
                var lObj            = new GTree();
                lObj.setIndex       (this.size() + 1);
                lObj.setParentIndex (_obj.getIndex());
                lObj.setName        (lLi.dataset.value);
                lObj.setType        ("file");
                this.add            (lObj);
            }
        }
    }
    //===============================================
    setIndex(_index)                            {this.m_index = _index;}
    setParentIndex(_parentIndex)                {this.m_parentIndex = _parentIndex;}
    setName(_name)                              {this.m_name = _name;}
    setType(_type)                              {this.m_type = _type;}
    add(_obj)                                   {this.m_map.push(_obj);}
    //
    getIndex()                                  {return this.m_index;}
    getParentIndex()                            {return this.m_parentIndex;}
    getName()                                   {return this.m_name;}
    getType()                                   {return this.m_type;}
    at(i)                                       {return this.m_map[i];}
    size()                                      {return this.m_map.length;}
    //===============================================
}
//===============================================
GTree.Instance().init();
//===============================================
