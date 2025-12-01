Job Analytics Dashboard – Project Documentation
1. Project Overview

The Job Analytics Dashboard is an end-to-end data analysis and visualization project built using the Job Descriptions Dataset obtained from Kaggle.

Dataset Used:
🔗 Job Description Dataset — Kaggle
https://www.kaggle.com/datasets/ravindrasinghrana/job-description-dataset

This project extends the training tasks, where each internship task is transformed into a dashboard component, analytical view, or data-driven visual built on the same dataset. The dashboard provides interactive, filter-driven insights across multiple job-related dimensions including salary, geography, qualifications, company size, work type, job portals, and more.

2. Dataset Summary

The dataset includes thousands of job postings from several countries and contains the following major fields:

Job Id

Country & Location

Latitude / Longitude

Work Type

Qualifications

Company Size

Experience (range format)

Salary Range (e.g., “55k to 80k”)

Job Title & Role

Contact Person

Job Posting Date

Job Portal

Skills, Responsibilities, Benefits

Company Profile

The dataset is highly valuable but required substantial transformation and cleaning to ensure accuracy in the analytics.

3. Data Cleaning & Preprocessing
3.1 Data Standardization

Removed leading/trailing whitespace across all text fields

Standardized categorical fields (Work Type, Qualifications, Country names)

Converted all string-based fields to uniform casing

Cleaned inconsistent or corrupted location and country entries

3.2 Salary Parsing (Numeric Conversion)

Salary formats included patterns like:

"55k to 80k"

"40K-60K"

"70k–90k"

A custom regex function extracted the numeric minimum salary:
"55k" → 55000

This enabled accurate salary-based filtering and visualization.

3.3 Experience Parsing (Start & End Values)

Experience formats included:

"0 to 15 Years"

"3-8 years"

"10 Years"

Two new fields were derived:

Experience_Start → first numeric value

Experience_End → last numeric value

This allowed precise filtering on:

Experience > 2

Even-number experience

Ending experience > 5

3.4 Date Cleaning

Job_Posting_Date was cleaned and converted into datetime format, supporting:

Custom date range filtering

Odd/even month logic

Pre/post cutoff date comparisons

3.5 Geographic Coordinate Cleaning

Latitude and Longitude fields were converted to numeric format to support mapping in Task 4.

4. Transformations Applied
Text-Based Transformations

Vowel count extraction in company names

One-word Job Title validation

Prefix-based filtering (e.g., countries not starting with A–D)

Contact Person name starting with specific characters

Numeric Transformations

Salary thresholds

Company size segmentation

Experience range extraction

Latitude-based filtering (<10)

Africa-only filtering

Portal & Preference Transformations

Job portal based segmentation (Indeed / LinkedIn / Idealist)

Gender preference analysis

5. Analytical Tasks & KPIs Measured
Task 1 – Intern Preference Analysis

Visualization: Bar Chart

Filters: latitude < 10, even experience, odd posting months
KPI: Gender preference distribution for Intern roles

Task 2 – Company Size Trends for Mechanical Engineers

Visualization: Scatter Plot

Filters: Asian countries excluding those starting with I, salary > 50,000, company vowel rules
KPI: Relationship between company size and Mechanical Engineering role demand

Task 3 – Top 10 Hiring Companies

Visualization: Bar Chart

Role = Data Engineer, Job Title = Data Scientist

Excluded Asia and countries starting with "C"

Company Size ≥ 10,000
KPI: Top employers for advanced data-centric roles

Task 4 – African Tech Hiring (Geospatial Map)

Visualization: Map (Latitude × Longitude)

Qualifications: B.Tech, M.Tech, PhD

Work Type = Full-Time

Company Size > 80,000

Job Title starting with “D”

All job portals included
KPI: Spatial distribution of high-skill African job postings

Task 5 – India vs Germany Hiring Comparison

Visualization: Stacked Bar Chart

Only B.Tech + Full-Time

Salary > $10,000

Posting Date before 08/01/2023
KPI: Demand comparison for key roles between India & Germany

Task 6 – Intern Salary Distribution

Visualization: Box Plot

Even experience

Job Title < 10 characters and one-word

Company Size < 50,000
KPI: Salary variation and outliers for internship roles

6. Dashboard Features
Live Dashboard Link

👉 https://job-analytics-dashboard.netlify.app/

Key Features

Fully interactive dashboard

Clean, modern UI

Real-time digital clock

Time-restricted visibility (3 PM–5 PM IST)

Countdown timer outside permitted hours

Embedded Tableau visualizations

Responsive layout for mobile and desktop

Smooth animations

Drilldown-enabled charts

7. Tools & Technologies Used
Data Processing

Python

Pandas, NumPy

Regex

Matplotlib

Visualization

Tableau Public

Custom filters and geospatial mapping

Frontend Website

HTML5

CSS3

JavaScript

Netlify for deployment

8. Conclusion

The Job Analytics Dashboard transforms a raw Kaggle job postings dataset into a fully interactive, visually rich analytics platform.
Through robust data cleaning, transformation, and multi-step analysis, each internship task has been implemented as a functional insight.

The project demonstrates strong competencies in:

Data engineering

Data visualization

Analytical reasoning

Frontend deployment

Dashboard development

This live system serves as both a learning showcase and a practical job analytics tool.