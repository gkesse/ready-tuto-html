//===============================================
// GTree.js
//===============================================
class GTree {
    //===============================================
    static m_instance = null;
    //===============================================
    constructor() {

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
        var lTrees = document.getElementsByClassName("tree1");
        for(var i = 0; i < lTrees.length; i++) {
            this.updateArrows(lTrees[i]);
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
        var lLis = _parent.querySelectorAll(".tree1 > li > .tree3, .tree1 > .tree4, .tree2 > li > .tree3, .tree2 > .tree4");
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
        var lLis = _parent.querySelectorAll(".tree1 > li > .tree3, .tree1 > .tree4, .tree2 > li > .tree3, .tree2 > .tree4");
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
}
//===============================================
GTree.Instance().init();
//===============================================
