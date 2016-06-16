function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v)
{

   //hollow perks
   v = v.replace(/(\b)Beer(\b)/g, "$1Grog$2");
   v = v.replace(/(\b)beer(\b)/g, "$1grog$2");
   v = v.replace(/(\b)kegs on tap(\b)/g, "$1frathouses$2");
   v = v.replace(/(\b)kegs(\b)/g, "$1frathouses$2");
   v = v.replace(/(\b)keg(\b)/g, "$1frathouse$2");
   v = v.replace(/pizza/g, "gruel");

   
   v = v.replace(/ninja/g, "loner");
   v = v.replace(/super[ -]*star/g, "magician");
   v = v.replace(/Super[ -]*star/g, "Magician");
   v = v.replace(/rock[ -]*stars/g, "douchebags");
   v = v.replace(/rock[ -]*star/g, "douchebag");
   v = v.replace(/Rock[ -]*star/g, "Douchebag");
   v = v.replace(/Rock[ -]*Star/g, "Douchebag");
   v = v.replace(/guru/g, "mansplainer");
   v = v.replace(/meritocracy/g, "Hunger Games");
   v = v.replace(/competitive\bsalary/g, "ok salary");
   v = v.replace(/competitive\bcompensation/g, "ok compensation");
   v = v.replace(/competitive/g, "Game of Thrones");

   v = v.replace(/Guru/g, "Mansplainer");
   v = v.replace(/black belt/g, "douchebag");
   v = v.replace(/jedi/g, "twenty something");
   v = v.replace(/Jedi/g, "Twenty something");
   v = v.replace(/evangelist/g, "yammerer");
   v = v.replace(/Evangelist/g, "Yammerer");
   v = v.replace(/(eclipse|textmate|intellij|netbeans)/gi, "The technical co-founder's arbitrary IDE of choice");
  
 
   //gendered terms. Say what they are really thinking
   v = v.replace(/grizzled/g, "male");
   v = v.replace(/bearded/g, "male");
 

    return v;
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);
