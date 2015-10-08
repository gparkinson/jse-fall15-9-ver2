var GUI = (function(){ //IIFE for all Views

var counter = 0;

var IssueView = Backbone.View.extend({
  render: function () {

			var title = this.model.get("title");
			var description = this.model.get("description");
			var creator = this.model.get("creator");
			var assignee = this.model.get("assignee");
			var status = this.model.get("status");
			
			var cl;
			if ((counter%2)==0) {
				cl = "even";	
			} else {
				cl = "odd";	
			}
			
			var html = $("<div class='" + cl + "'></div>");
			var t = "<div class='col-lg-3 task_item'>" + title + "</div>";
			var s = "<div class='col-lg-3 task_item'>" + status + "</div>";
			var a = "<div class='col-lg-3 task_item'>" + assignee + "</div>";
			var c = "<div class='col-lg-3 task_item'>" + creator + "</div>";
			
			html.append(t);
			html.append(s);
			html.append(a);
			html.append(c);
			
			var clear = "<div class='clear'></div>";
			
			html.append(clear);
			
			counter++;
			
	        this.$el.html(html);
	    
    },
});




//"<div class=titleField>" + title + "</div>" + 
 //       				"<div class=statusField>" + status + "</div>" + 
 //       				"<div class=assigneeField>" + assignee + "</div> " + 
 //       				"<div class=creatorField>" + creator + "</div> " +
 //       				"<div class=myClear></div>"

var CreateTaskView = Backbone.View.extend({

});

var UnassignedTasksView = Backbone.View.extend({
	render: function () {
	var issues = this.collection;
		var self = this;
		issues.forEach(function(issue){
			var status = issue.get("status");
			console.log(status);
			if (status == "unassigned") {
				var issueView = new IssueView({model: issue});
				issueView.render();
				self.$el.append(issueView.$el);
			};
		});
	}
});

var UserTasksView = Backbone.View.extend({
	render: function () {
		var issues = this.collection;
		var currentUser = this.currentUser;
		var self = this;
	//	console.log("collection self" + self.currentUser);
		issues.forEach(function(issue){
			var currentUser = self.currentUser;

	//		console.log("foreach currentuser" + currentUser);
			var creator = issue.get("creator");
			var assignee = issue.get("assignee");

			if ((creator == currentUser) || (assignee == currentUser)) {
				var issueView = new IssueView({model: issue});
				issueView.render();
				self.$el.append(issueView.$el);
			};
		});
	}
});

var UserView = Backbone.View.extend({
	events: {
		'click #logoutButton' : 'logOutUser'
	},

	logOutUser: function() {

	},

	initialize: function() {
//		console.log(this.collection);
//		console.log(this.collection.findWhere({status: 'unassigned'}));
///		console.log('hello');
		this.render();
	},

	render: function() {
		var taskSelf = this;
		var logoutButton = '<button id ="logoutButton">Logout</button>';
		taskSelf.$el.html("<div>Logout:</div>" + logoutButton)

	}

});

var LoginView = Backbone.View.extend ({
	
	events : {
		'click #nameButton': 'nameOfFunction'

	},

	nameOfFunction: function() {
		// console.log(($('#typedName').val()));
		var certainUserName = ($('#typedName').val());
		var userValid = this.collection.findWhere({username: certainUserName});
		var certainUserPassword = ($('#typedPassword').val());

		if(userValid.attributes.password == certainUserPassword) {
			console.log("Success");
			$('#nameButton').hide();
			$('#typedName').hide();
			$('#typedPassword').hide();
			$('#typedName').hide();
			
			}
		else {
			console.log("Nope");
		}	


	},
	initialize: function() {
		//This is just to see processes-- doesn't actually move project forward//
		// console.log(this.collection);
		// console.log(this.collection.findWhere({username:'Person1'}));
		// var username=this.collection.findWhere({username:'Person1'});
		// console.log(username.attributes.password);
		// console.log($(this.el));
	},
	render: function () {
		var userSelf = this;
		
		// var username = this.collection.findWhere({username:'Person1'}).attributes.username;
		var inputUsername = '<input type="text" id="typedName" value=" input username  " />'
		console.log($('#typedName'));
		var inputPassword = '<input type="text" id="typedPassword" value=" input password " />'
		var userButton = '<button id ="nameButton">Enter</button>';
		userSelf.$el.html("<br><div id ='loginArea'><div>Login:<br>" + inputUsername + "</div>" +
			 "<div>Password:<br>" + inputPassword + "</div>" + userButton + "</div>")
	},



});


// generic ctor to represent interface:
function GUI(users,issues,el) {

	var userTasks = new UserTasksView({collection: issues});
	userTasks.currentUser = "Person1";
//	console.log(userTasks.currentUser);
	userTasks.render();
	$("#user_issues_list").html("");
	$("#user_issues_list").append(userTasks.$el);
	
	var unAssignedTasks = new UnassignedTasksView({collection: issues});
	unAssignedTasks.render();
	$("#unassigned_issues_list").html("");
	$("#unassigned_issues_list").append(unAssignedTasks.$el);

	var login = new LoginView({collection: users});
	login.render();
	$("#login").append(login.$el);

	var userPage = new UserView({collection: issues});
	$(el).append(userPage.$el); 
};

return GUI;
}())
