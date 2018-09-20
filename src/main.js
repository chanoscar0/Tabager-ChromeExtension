
var colors = ['teal lighten-2', 'teal lighten-1', 'teal', 'teal darken-1','teal darken-2'];
var i = 0;

function retrieveTabs(){
    //Grab Array of tab objects from chrome tabs query
    chrome.tabs.query({currentWindow: true}, function(arrOfTabs){
        //Iterate over Arr of Tabs creating 2 new DOM Button elements per Tab
        arrOfTabs.forEach(function(tabObject, index){
            i++;
            console.log(tabObject);
            //Button for Active Tab highlighting
            let tabId = tabObject.id;
            let listItem = document.createElement('button');
            //Button for tab deletion
            let deleteButton = document.createElement('button');
            let icon = document.createElement('img');
            icon.className = "icon";
            icon.id = "icon" + index;
            deleteButton.id = "button" + index;
            if(index % 5 === 0) {
                colors = colors.reverse();
            }
            deleteButton.className = "list-item waves-effect waves-light btn-small " + colors[index % 5];
            listItem.id = "link" + index;
            listItem.className = "waves-effect waves-light btn-small list-item " + colors[index % 5];
            console.log(listItem.className);
            icon.src = tabObject.favIconUrl; 
            listItem.innerHTML = tabObject.title;

            deleteButton.innerHTML = "Delete";
            //Setting up event listeners on buttons for active tab highlighting
            listItem.addEventListener('click', function(){
                chrome.tabs.highlight({tabs: index});
            })
            deleteButton.addEventListener('click', function(){
                chrome.tabs.remove(tabId);
                icon.parentNode.removeChild(icon);
                listItem.parentNode.removeChild(listItem);
                deleteButton.parentNode.removeChild(deleteButton);
            })
            // previewButton.addEventListener('click', function(){

            // })
            //Append to the DOM
            document.getElementById("container").append(icon);
            document.getElementById("container").append(listItem);
            document.getElementById("container").append(deleteButton);
        });

        let addButton = document.createElement('button');
        addButton.id = "addButton";
        addButton.innerHTML = "+";
        addButton.className = "waves-effect waves-light btn-small add-button" + colors[i % 5];
        addButton.addEventListener('click',function(){
            chrome.tabs.create({active: true})
        });
        document.getElementById("container").append(addButton);
    });
}
retrieveTabs();

//Function used to parse out the Domain name from the URL.
function getDomainName(url){
    var a = document.createElement('a');
    a.setAttribute('href',url);
    return a.hostname.replace('www.','').replace('.com','').replace('.org','');
}
