# jobR – A JOB SEARCH TRACKING TOOL
An easy to use job tracker

## Getting Started
1.	Offer a job search tool to query by job title (e.g., nurse, chemical engineer, etc.) in a geography by City, State or Zip Code
2.	Enable the user to save a job to a database so they may return to the job’s URL.
3.	Use AJAX calls to capture from the CareerOneStop API, provided by the US Dept of Labor:
a.	Job Essentials
.. i.	Job Title – API derived
.. ii.	Company – API derived
.. iii.	Location (City, St) – API derived
.. iv.	Post URL – API derived
.. v.	Post Date – API derived
4.	Store all the API data in an ORM model to extend the user’s capability to:
a.	Expand upon the job by adding
.. i.	Salary 
.. ii.	Job Description – user entry or paste
.. iii.	Dates
1.	Applied Date
2.	Interview 1 Date/Time
3.	Interview 2 Date/Time
4.	Offer Date
.. iv.	Notes – tabular with Date/Time
.. v.	Kanban-ize the job into boards
1.	Interested
2.	Applied
3.	Interview
4.	Offer
## User Stories
.. Story	Role	Goal	Motivation
..Locate a job	User	Search for a job by title and geography	Limit the number of jobs I see at one time
..Store a job locally	User	Capture information about each job, including: salary (if available), a description (if applicable), and any notes I might add	Help to determine if I have contacts at the company, whether to apply, and any other job-company information I would need to pursue this job
..Add tasks associated with the job	User	Add a task related to an activity associated with this job, e.g., apply, write a cover letter, request an interview	Continue to pursue this job or to eliminate it as a possibility
..View jobs associated with their Kanban board location	User	Move or categorize the job according to overall activities associated with it, i.e., interested, applied, interview scheduled	Isolate and readily find the jobs I am focused on pursuing

## ER Diagram
![alt text]([https://github.com//Users/Michael/code/Unit2/jobr/Research/jobR_ERD.png](https://github.com/mickeychcg/jobr/blob/master/Research/jobR_ERD.png) "JobR ERD")