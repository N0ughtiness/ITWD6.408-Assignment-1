//-----------------------------------------------------
//CURTAIN MENU
function openNav() {
	document.getElementById("curtain-nav").style.width = "50%";			
}

function closeNav() {
	document.getElementById("curtain-nav").style.width = "0%";			
}

//------------------ RSS ------------------//
function loadRSS() {
	//Use CORS API website as proxy to retrieve RSS file
	let proxy = 'https://cors-anywhere.herokuapp.com/';
	//Declare the URL where we fetch RSS file
	let url = "https://www.smashingmagazine.com/feed/;"
	
	//Create a an XMLHttpRequest Object to request data
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET", proxy + url, true);
	xhttp.send();
	//Process RSS file when it had been loaded successfully 
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		// Typical action to be performed when the document is ready:
		//document.getElementByID("demo").innerHTML = xhttp.responseText;
		parseRSS(this); }
		};
	}
	
	function parseRSS(rss) {
		let txt, nodes;
		txt = "";
		const items = rss.responseXML.getElementsByTagName("item");
		
		for (let i = 0; i < items.length; i++) {
			//console.log(items[i].children);
			nodes = items[i].children;
			let title, pubdate, description, link;
			for (let j = 0; j < nodes.length; j++) {
				//console.log(nodes);
				if (nodes[j].tagName == "title") {
					title = nodes[j].childNodes[0].nodeValue;
				} else if (nodes[j].tagName == "link") {
					link = nodes[j].childNodes[0].nodeValue;
				} else if (nodes[j].tagName == "description") {
					description = nodes[j].childNodes[0].nodeValue;
				} else if (nodes[j].tagName == "pubDate") {
					pubdate = nodes[j].childNodes[0].nodeValue;
				}
			}
				//Set the txt string as HTML format.
				txt += `
							
							<div class="col-12 col-md-6 mt-1">
								<div class="item m-1 p-1 border border-dark bg-opacity-25 bg-secondary">
									<h3>${title}</h3>
									<p>${description}</p>
									<p>${pubdate}</p>
									<a href="${link}">Read More</a>
								</div>
							</div>`;
						
					//txt += x[i].children[0].innerHTML;
					//txt += "<a href='" + x[i].childNodes[3].nodeValue + "'" + ">" + x[i].childNodes[3].nodeValue + "</a><br>";
			
			
			//Write txt in HTML format on webpage
			document.getElementById("rssFeed").innerHTML = txt;
		}
	}

//------------------------------------------------------------------------------------------------------	
//JS Page: 5 items from PBtech
let pbItems = [{id: 0, title: "Microsoft Xbox Series X 1TB Console", price: "$799.00", image_url: "MEDIA/item0.png"},
{id: 1, title: "Nintendo Switch OLED Console - White", price: "$619.00", image_url: "MEDIA/item1.png"},
{id: 2, title: "Microsoft Xbox Series S 512GB Console", price: "$549.00", image_url: "MEDIA/item2.png"},
{id: 3, title: "Nintendo Switch Console - Neon v2", price: "$538.99", image_url: "MEDIA/item3.png"},
{id: 4, title: "Nintendo Switch Lite - Turquoise", price: "$378.99", image_url: "MEDIA/item4.png"},
];
//------------------------------------------------------------------------------------------------------ //SLIDE SHOWS
//Slideshow: Manual
let slideIndex = 0;//Initial slide = 0
function nextSlide() {
//Change the slide_index
if (slideIndex < pbItems.length - 1) {
slideIndex++;
} else {
slideIndex = 0;
}
//Change the image source for the img
document.getElementById("manual-slide-title").innerHTML = pbItems[slideIndex].title;
document.getElementById("manual-slide-price").innerHTML = pbItems[slideIndex].price;
document.getElementById("manual-slide-image").src = pbItems[slideIndex].image_url;
}
function previousSlide() {
//Change the slide_index
if (slideIndex > 0) {
slideIndex--;
} else {
slideIndex = pbItems.length - 1;
}
//Change the image source for the img
document.getElementById("manual-slide-title").innerHTML = pbItems[slideIndex].title;
document.getElementById("manual-slide-price").innerHTML = pbItems[slideIndex].price;
document.getElementById("manual-slide-image").src = pbItems[slideIndex].image_url;
}

//Slideshow: Automatic
let autoSlideIndex = 0;//Initial slide = 0
function autoSlideShow() {
//Change the slide_index
if (autoSlideIndex < pbItems.length - 1) {
autoSlideIndex++;
} else {
autoSlideIndex = 0;
}
//Change the image source for the img
document.getElementById("auto-slide-title").innerHTML = pbItems[autoSlideIndex].title;
document.getElementById("auto-slide-price").innerHTML = pbItems[autoSlideIndex].price;
document.getElementById("auto-slide-image").src = pbItems[autoSlideIndex].image_url;
//Wait 3 seconds
setTimeout(autoSlideShow, 3000);//Auto change slide every 3 seconds
}
autoSlideShow() // Call to run auto slideshow


//------------------------------------------------------------------------------------------------------
//DROPDOWN MENU TO SELECT ITEM
//Populate the select "options" with all the items in the array when the page is loaded
function loadMyItems() {
let itemSelect = document.getElementById("my-itemList");
for(var i=0; i < pbItems.length; i++) {
//Create a new child HTML node/element as "<option>" (as a child node)
let node = document.createElement("option");
//Assign option "text content" and "value" to this new node
node.value = pbItems[i].id.toString();
node.textContent = pbItems[i].title.toString();
//Append the above HTML node (option) to the parent node "itemList"
itemSelect.appendChild(node);
}

//Set the first item as selected option in drop-down list
itemSelect.selectedIndex= "0";
}
//call to execute this function when loading the webpage
loadMyItems();
//When user select an option in the dropdown menu (select), display that option
function displayMyitem() {
//Get the selected item "option value"
let selecteditemIndex = document.getElementById("my-itemList").value;
document.getElementById("my-itemTitle").innerHTML = pbItems[selecteditemIndex].title;
document.getElementById("my-itemPrice").innerHTML = pbItems[selecteditemIndex].price;
document.getElementById("my-itemImageURL").src = pbItems[selecteditemIndex].image_url;
}

//------------------------------------------------------------------------------------------------------
//ADD NEW COMMENT
//Data: Assume we have a list of existing comments stored in an array "allComments"
let allComments = [{name: "Ian", comment: "Recommended, good one"},
{name: "Aman", comment: "I don't like this item"},
{name: "John", comment: "Love it"},
];
//----------
//Load all existing comments and display them on HTML
function loadComments() {
//Loop through all comments in the array "allComments"
for (var i=0; i < allComments.length; i++) {
let name = allComments[i].name;
let comment = allComments[i].comment;
//
//Create a new HTML node/element <P> to display this comment
let node = document.createElement("P");
let textnode = document.createTextNode(name + ": " + comment);
node.appendChild(textnode);//Append the content (created TextNode) to the HTML Node (child)
let parrent_node = document.getElementById("comment-list");//Get the id of parent node "commentlist"
parrent_node.appendChild(node);//Append the above child HTML node to the parent node
}
}

//Call to run this loadComments function when the webpage is loaded.
loadComments();
//----------
//Add a new comment
function addComment() {
//Get entered value/data by user
let enteredCommentName = document.getElementById("comment_name").value;
let enteredCommentText = document.getElementById("comment_text").value;
//Add this new comment to the array
allComments.push({name: enteredCommentName, comment: enteredCommentText});
alert("Thank you for your comment!");
//Display this new comment on HTML page
//Create a new child HTML node/element as "<p>" (paragraph) (as a child node)
let node = document.createElement("P");
//Create a new TextNode
let textnode = document.createTextNode(enteredCommentName + ": " + enteredCommentText);
//Append the content (created TextNode) to the HTML Node (child)
node.appendChild(textnode);
//Get the id of parent node "comment-list"
let parrent_node = document.getElementById("comment-list");
//Append the above child HTML node to the parent node
parrent_node.appendChild(node);
//Clear comment box
document.getElementById("comment_name").value = "";
document.getElementById("comment_text").value = "";
} 

//------------------------------------------------------------------------------------------------------
//VOTE: LIKE / DISLIKE
//Assume the current Votes are: 20 likes and 5 dislikes
let currentVotes = {like: 20, dislike: 5};
//Load the current votes to HTML page
document.getElementById("likeNumber").innerHTML = currentVotes.like;
document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike;
//Variables to track the clicking status
//RULE: Allow to vote only one: UP or DOWN
let voteStatus = {like: false, dislike: false};
//Click Like button
function like() {
//Check current status of "like" button (has been clicked or not)
if (voteStatus.like == false) {
//Increase a "Like": Increase the like number by 1
document.getElementById("likeNumber").innerHTML = currentVotes.like + 1;
//Change the background color of Like button to GREEN
document.getElementById("likeButton").style.backgroundColor = "green";
//Change the current status of "like" button: has been clicked
voteStatus.like = true;//
//Check "dislike" status - if dislike has been voted, down it by one & change status to False &
//change background color to white
if (voteStatus.dislike == true) {
document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike;
voteStatus.dislike = false;//
document.getElementById("dislikeButton").style.backgroundColor = "white";
}
} else {
//Keep the current number of like
document.getElementById("likeNumber").innerHTML = currentVotes.like;
//Change the background color of Like button to WHITE
document.getElementById("likeButton").style.backgroundColor = "white";
//Change the current status of "like" button
voteStatus.like = false;//has been clicked
}
}
//Click Dislike button
function dislike() {
//Check current status of "dislike" button (has been clicked or not)
if (voteStatus.dislike == false) {
//Increase a "disLike" by 1
document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike + 1;
//Change the background color of Like button to GREEN
document.getElementById("dislikeButton").style.backgroundColor = "green";
//Change the current status of "dislike" button
voteStatus.dislike = true;//has been clicked
//Check "like" status - if like has been voted, down it by one & change status to False & change
//background color to white
if (voteStatus.like == true) {
document.getElementById("likeNumber").innerHTML = currentVotes.like;
voteStatus.like = false;//
document.getElementById("likeButton").style.backgroundColor = "white";
}
} else {
//Keep the current number of of "dislike"
document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike;
//Change the background color of disLike button to WHITE
document.getElementById("dislikeButton").style.backgroundColor = "white";
//Change the current status of "dislike" button
voteStatus.dislike = false;//has been clicked
}
}