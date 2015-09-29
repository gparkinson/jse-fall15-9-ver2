var app = {};

$(function() { //when DOM is ready...
	app.users = new UserCollection([
		{username:'Person1', password: 'pizzaRat'},
		{username:'Person2', password: 'motherGoose'},
		{username:'Person3', password: 'snowMan'}
	]);

	app.issues = new IssueCollection([
		{title:'task1 title',
		description:'task1 description',
		creator:'Person1',
		assignee:'Person2',
		status:'assigned'},
		{title:'task2 title',
		description:'task2 description',
		creator:'Person2',
		assignee:'',
		status:'unassigned'},
		{title:'task3 title',
		description:'task3 description',
		creator:'Person3',
		assignee:'Person1',
		status:'assigned'}
	]);

app.gui = new GUI(app.users,
					app.issues,
					'#myIssues');// selector of main div

})