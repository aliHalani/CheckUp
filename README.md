# CheckUp

CheckUp is a concept for a healthcare management platform that connects doctors and patients so they can manage their appointments and prescriptions, and allows patients to have prescriptions delivered to them when ready.

The front-end is built with React, which retrieves data from an API served by Flask. Application data is stored in a MySQL database.


## Demo

![Dashboard Preview](/docs/doctor_dashboard.png)

View a full demo here: https://youtu.be/xxFSwZda0Ng.

## The Platform

The inspiration for this idea to create a platform that would allow users to manage their doctor's appointments and prescriptions, and that would allow patients to have their prescriptions delivered to them, came from 1: the recent Coronavirus global pandemic, and 2: the existing capabilities of the HiRide and Facedrive platforms.

The recent pandemic made me think: those who belonged to groups more at risk from the effects of the Coronavirus, such as the elderly and those with pre-existing health conditions, were told to stay inside and avoid social contact. However, these groups of people are also the most likely to require medication to help them manage their pre-existing health conditions. That led me to wonder — **how can those who need medication get access to it without having to go outside and put their own health or the health of the public at risk?**

Looking at HiRide and Facedrive's existing capabilities led me to a solution for this problem. **CheckUp can leverage HiRide and Facedrive's existing pool of drivers to allow users to have their prescriptions delivered directly from their pharmacy to their homes, avoiding the need for a user to pick it up themselves and eliminating the risk of putting their own health and the health of others in jeopardy.** This solution provides value not only to the users who have their prescriptions delivered, but also to the active drivers on the Facedrive and HiRide platforms who would now have access to a large source of recurring deliveries they can choose to take on. This solution tackles issues in both the healthcare and transportation space, while addressing the current climate of social distancing.

## How It Works

The degree of integration that can be achieved with different parties is flexible. At a minimum, a partnership would need to be established with pharmacies so they can prepare prescriptions and mark them as ready to be picked up. Pharmacies who are registered with the platform can associate any prescriptions they receive with the appropriate patient who is also registered on the platform. From here, integration with the delivery services provided by HiRide and Facedrive can allow users to send drivers to pick up and deliver prescription when a user is alerted by the pharmacy that their prescription is ready for pickup, or on regular prescription re-fill intervals. 

A standardized form of packaging, such as an opaque bag with a tamper-proof seal displaying only an order #, can be employed to ensure a user's right to privacy and safety is respected. The degree of integration can also optionally be expanded to include a partnership with prescribing doctors, who can input their prescriptions directly into CheckUp which will automatically notify a pharmacy to begin the process covered above.


## How to Run

To run the platform, simply clone the repo, navigate into the directory, and run `docker-compose up` (of course, you must have docker installed!).


## Notes

Developed and tested on Windows 10.
