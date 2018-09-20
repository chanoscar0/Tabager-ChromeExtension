
let colors = ['teal lighten-2', 'teal lighten-1', 'teal', 'teal darken-1', 'teal darken-2'];
let i = 0;

function retrieveTabs() {
  //Grab Array of tab objects from chrome tabs query
  chrome.tabs.query({ currentWindow: true }, (arrOfTabs) => {
    //Iterate over Arr of Tabs creating 2 new DOM Button elements per Tab
    arrOfTabs.forEach((tabObject, index) => {
      //increment 'i' so that the colors array has a new element each iteration
      i++;
      console.log(tabObject);
      //Button for Active Tab highlighting
      const tabId = tabObject.id;
      //Button for list item
      const listItem = document.createElement('button');
      //Button for tab deletion
      const deleteButton = document.createElement('button');
      //Favicon image
      const icon = document.createElement('img');
      //Change class name to manipulate in css
      icon.className = 'icon';
      //add an id so that favicon html is tied to a uniform id if needed to analyze
      icon.id = 'icon' + index;
      //add an id so that delete button html is tied to a uniform id if needed to analyze
      deleteButton.id = 'button' + index;
      //reverse the array of colors so that the color change flips at the end
      if(index % 5 === 0) {
        colors = colors.reverse();
      }
      //set the class name to Google Materialize CSS
      deleteButton.className = 'list-item waves-effect waves-light btn-small ' + colors[index % 5];
      //add an id so that listItem button html is tied to a uniform id if needed to analyze
      listItem.id = 'link' + index;
      //set the class name to Google Materialize CSS
      listItem.className = 'waves-effect waves-light btn-small list-item ' + colors[index % 5];
      //set the source for the icon to be the faviconurl found in the tabobject
      icon.src = tabObject.favIconUrl;
      //set the inner html of list item to be the title of each tabobject
      listItem.innerHTML = tabObject.title;
      //set the inner html of list item to be the title
      deleteButton.innerHTML = 'Delete';
      //Setting up event listener on list buttons for active tab highlighting
      listItem.addEventListener('click', () => {
        chrome.tabs.highlight({ tabs: index });
      });
      //Setting up event listener on delete buttons to remove the tab and the HTML tied to that tab
      deleteButton.addEventListener('click', () => {
        chrome.tabs.remove(tabId);
        icon.parentNode.removeChild(icon);
        listItem.parentNode.removeChild(listItem);
        deleteButton.parentNode.removeChild(deleteButton);
      });

      //Append to the DOM container which is a grid
      document.getElementById('container').append(icon);
      document.getElementById('container').append(listItem);
      document.getElementById('container').append(deleteButton);
    });
    
    //create the add button at the bottom of the container
    const addButton = document.createElement('button');
    //give the add button an id to manipulate in CSS
    addButton.id = 'addButton';
    //set the add button inner html to be a '+' sign
    addButton.innerHTML = '+';
    //set the class name to Google Materialize CSS
    addButton.className = 'waves-effect waves-light btn-small add-button' + colors[i % 5];
    //add an event listener that creates a new tab when the add button is pressed
    addButton.addEventListener('click', () => {
      chrome.tabs.create({active: true})
    });
    //append the add button to the container grid
    document.getElementById('container').append(addButton);
  });
}
//run the function
retrieveTabs();
