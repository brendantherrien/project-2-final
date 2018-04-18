// showPage function
// Filters the students if a filter is passed, then checks if each student should be on the given page. Finally, creates pagination buttons by calling the appendPageLinks function.
const showPage = (page, students, filter = null) => {
    
    // Hide all students
    $(".student-item").hide();
    
    // Create a new filtered students array
    let filteredStudents = [];
    // Loop through all students
    $(students).each( index => {
        // Does the student's name or email match the filter?
        // Get student name and email
        let studentName = $(students[index]).find("h3").text();
        let studentEmail = $(students[index]).find(".email").text();

        // match against filter
        if (filter === null || studentName.indexOf(filter) >= 0 || studentEmail.indexOf(filter) >= 0) {
            // Add to filtered students array
            filteredStudents.push(students[index]);
        }
    });

    // Loop through all the filtered students
    $(filteredStudents).each( index => {
        // Is index is correct range for this page?
        let low = page * 10 - 10;
        let high = page * 10;
        if (index >= low && index < high)
            // Show student
            $(filteredStudents[index]).show();
    });
    
    // Show message if no students to display
    if (filteredStudents.length < 1) {
        // But only if the message doesn't already exist
        if (!$(".message").length)
            $(".student-list").append("<h4 class='message'>No students found.</h4>");
    } else {
        // Otherwise remove any message
        $(".message").remove();
    }
    
    appendPageLinks(filteredStudents, filter);
        
};

// appendPageLinks function
// Calculates number of pages needed and builds a pagination link for each one.
const appendPageLinks = (students, filter) => {
    
    // How many pages do we need?
    let numPages = Math.ceil(students.length / 10);
    
    // Build page link section
    let pageLinks = "<div class='pagination'><ul>";
    
    // Make a page link for every page
    for (let i = 1; i <= numPages; i++) {
        pageLinks += "<li><a href='#' page='" + i + "'>" + i + "</a></li>";
    }
    
    pageLinks += "</ul></div>";
    
    // Remove old pagination
    $(".pagination").remove();
    
    // Add new one
    $(".page").append(pageLinks);
    
    // Click a pagination link
    $(".pagination a").on("click", (e) => {
        e.preventDefault();
        // Get the page number
        let page = parseInt($(e.target).text());
        // Call the showPage function
        showPage(page, students, filter);
        // Make this link active
        $("a[page='" + page + "']").addClass("active");
    });
    
};

// Get the students
let students = $(".student-item");
// Show the first page
showPage(1, students);
// Make first page active
$("a[page='1']").addClass("active");



/******* SEARCH FEATURE *******/
// Append search HTML to page-header
let searchHTML = "<div class='student-search'><input placeholder='Search for students...'><button>Search</button></div>";
$(".page-header").append(searchHTML);

// Wait for search button click
$(".student-search").on("click", "button", (e) => {
    // Get the search
    let search = $(".student-search input").val();
    showPage(1, students, search);
    // Make first page active
    $("a[page='1']").addClass("active");
});
