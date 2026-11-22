# Pochentong Airport Archive


*A Digital Archive of Phnom Penh Pochentong's Formal Airport Memories*


## 1. What This Is


Pochentong Airport Archive is a bilingual digital archive dedicated to preserving personal memories, stories, and experiences connected to Phnom Penh's former international airport, Pochentong International Airport (PNH). Before the opening of Techo International Airport, Pochentong served as Cambodia's main international gateway and was part of many people's journeys, family memories, and everyday lives. This project brings those memories together in one accessible online collection where visitors can explore published stories, search in English or Khmer, and contribute their own experiences. Contributors can submit stories and photographs, while authorized reviewers manage submissions before they become publicly available. The goal is to preserve a part of Cambodia's shared history through the personal experiences of the people connected to it.


## 2. Who It's For


The archive is intended for people in Cambodia who have personal or historical connections to Pochentong Airport, including former airport workers, travelers, local residents, families, and people who grew up around the airport.


The platform was designed with Cambodian users in mind:


- **Bilingual experience:** The interface and archive content support both English and Khmer, allowing users to explore memories in either language.
- **Cross-language search:** Users can search using English or Khmer keywords regardless of their selected interface language.
- **Mobile-friendly design:** Responsive layouts allow users to browse and contribute through phones, tablets, and desktop computers.
- **Accessible navigation:** Consistent navigation, clear page transitions, helpful empty states, and visible submission statuses help users understand where they are and what to do next.
- **Source attribution:** Entries identify their contributors or sources so that personal memories are not presented as anonymous historical facts.


The design also uses familiar aviation elements, including aircraft illustrations, airport-inspired visuals, and takeoff animations, to create an experience that reflects the identity and history of Pochentong Airport.


## 3. How It Works


### Technology Stack


| Technology | Purpose                                                |
| ---------- | ------------------------------------------------------ |
| Next.js 15 | Application framework and routing                      |
| React 19   | User interface and interactive components              |
| JavaScript | Application logic                                      |
| CSS        | Styling, responsive layouts, and animations            |
| Supabase   | PostgreSQL database, authentication, and photo storage |
| Vercel     | Application deployment and hosting                     |


### Application Architecture


The application uses Next.js App Router to organize its pages and components. Supabase provides the backend services, including user authentication, database storage, and photo uploads.


The general data flow is:


1. A visitor opens the application.
2. Next.js retrieves published entries from Supabase.
3. Entry data is transformed into the format used by the React components.
4. Visitors browse, search, and view individual memories.
5. Registered contributors authenticate through Supabase and submit their own entries.
6. New entries are stored with a pending status.
7. Authorized reviewers access the review queue and decide whether to publish or return submissions.
8. Published entries become visible in the public archive.


### Database Structure


The main application data is stored in Supabase PostgreSQL.


**`entries` table**


Stores the archive entries, including:


- `id` – Unique entry identifier.
- `created_at` – Submission timestamp.
- `owner` – UUID identifying the contributor's Supabase account.
- `title` / `title_km` – English and Khmer titles.
- `description` / `description_km` – English and Khmer descriptions.
- `story` / `story_km` – English and Khmer stories.
- `tags` / `tags_km` – English and Khmer tags.
- `contributor` / `contributor_km` – Contributor names in both languages.
- `images` – References to the entry's photographs.
- `status` – Current review status.


The bilingual fields are stored separately, allowing the application to display the appropriate language without translating the content dynamically.


**`reviewers` table**


Stores the UUIDs of accounts authorized to review submissions. Row Level Security is enabled without API access policies, meaning users cannot add themselves or modify the reviewer list through the application.


**Supabase Auth**


Manages contributor accounts and user sessions. Each submitted entry is associated with its owner's authenticated user ID.


**Supabase Storage**


The `photos` storage bucket holds photographs uploaded with contributed entries. Contributor-specific folders organize uploaded images by user ID.


### Entry Statuses


Every entry has one of three statuses:


| Status      | Meaning                                              |
| ----------- | ---------------------------------------------------- |
| `pending`   | Newly submitted entry waiting for reviewer approval. |
| `published` | Approved entry visible to public visitors.           |
| `returned`  | Entry sent back to its owner for revision.           |


New submissions receive the `pending` status by default. Editing a returned or previously submitted entry sends it back for review.


### Access and Data Flow


- **Public visitors:** Can read published entries.
- **Authenticated contributors:** Can submit entries and access their own submissions.
- **Entry owners:** Can edit and delete their own entries.
- **Authorized reviewers:** Can access the review queue and make decisions on pending submissions.
- **Unauthorized users:** Cannot access the reviewer queue or perform reviewer actions.


## 4. Security Decisions


Security is enforced primarily through Supabase Row Level Security (RLS) and database functions rather than relying only on frontend restrictions.


### Row Level Security


RLS policies determine which records authenticated and unauthenticated users can access.


The main decisions are:


- Public visitors can read published entries.
- Contributors can read their own entries, including pending and returned submissions.
- Contributors can insert entries only when the authenticated user matches the entry's `owner` and the status is `pending`.
- Contributors can update their own entries, with non-reviewer edits required to return to `pending`.
- Contributors cannot edit or delete entries belonging to other users.
- Reviewers can read entries through their reviewer authorization.


### Reviewer Authorization


The application uses two database functions:


**`is_reviewer()`**


Checks whether the currently authenticated user exists in the `reviewers` table. This function is used to determine reviewer access.


**`review_entry(entry_id, decision)`**


Handles reviewer decisions directly in the database.


The function:


1. Checks whether the current user is an authorized reviewer.
2. Accepts only `published` or `returned` as valid decisions.
3. Updates only entries currently in the `pending` state.
4. Returns `true` if an entry was successfully updated and `false` otherwise.


The function uses `SECURITY DEFINER` so it can perform the restricted database operation while checking reviewer authorization internally. Its execution privileges are restricted to authenticated users.


The application calls this function through Supabase RPC rather than directly updating an entry's status from the frontend.


### Why the Database Is the Gate


Hiding a Publish button or restricting access to the `/review` page is not sufficient security by itself. A user could still attempt to interact with the Supabase API directly.


For this reason, the database independently verifies permissions. The frontend restriction improves the user experience, while RLS and the database functions enforce the actual access rules.


### Additional Design Decisions


- **Returned entries:** Reviewers can provide an optional comment explaining why an entry was returned. The contributor can view the feedback and revise the entry before resubmitting it.
- **Reviewer permissions:** Reviewers can publish or return pending entries but do not automatically receive permission to edit or delete another contributor's entry.
- **Contributor visibility:** Contributors can see their own pending and returned submissions through My Entries, while public archive queries display published content only.
- **Photo validation:** Uploaded photographs are checked against supported image formats using their file signatures, rather than relying only on their filenames or browser-reported MIME types. Uploads are limited to 4 MB.
- **Ownership-based storage:** Photo replacement and deletion operations are restricted to the contributor's own storage folder.


## 5. AI Use


AI tools were used throughout development to assist with planning, implementation, UI design, debugging, documentation, and code refinement. They were used as development assistants rather than as replacements for understanding and reviewing the code.


The primary coding workflow involved Cline with Claude models, alongside ChatGPT for planning, technical explanations, troubleshooting, and prompt refinement.


### Models and Their Contributions


| Model / Tool     | Tasks                                                                                                                           | What Was Kept or Changed                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Claude Sonnet 5  | Initial project understanding, homepage redesign, and larger UI changes.                                                        | Much of the generated layout and styling was retained after reviewing the implementation and checking it in the browser.                         |
| Claude Haiku 4.5 | Search implementation, animations, data management, image organization, and smaller code improvements.                          | Useful focused implementations were retained. Some suggestions required clarification or correction before implementation.                       |
| Claude Fable     | UI redesign and visual refinement.                                                                                              | Used as part of the iterative design process, with outputs reviewed and adjusted to match the project's existing design.                         |
| Claude Opus 5.5  | Later development work, including UI improvements, animations, bug fixes, and feature refinements.                              | Most outputs were useful and retained after review. Follow-up prompts were used when the implementation did not fully match the intended result. |
| ChatGPT          | Planning, prompt engineering, technical explanations, debugging assistance, documentation, and reviewing development decisions. | Suggestions were evaluated before being incorporated into the project.                                                                           |
| Gemini Flash     | Assistance with English-to-Khmer translation.                                                                                   | Translations were reviewed and adjusted where necessary.                                                                                         |


### Human Review and Verification


AI-generated code was not automatically accepted. The development process included:


- Reviewing generated code and implementation summaries.
- Checking changes and diffs before accepting them.
- Running the application locally and checking browser behavior.
- Testing search with English and Khmer keywords.
- Checking authentication and contributor/reviewer workflows.
- Using additional test accounts to examine access restrictions.
- Running ESLint and production builds when appropriate.
- Revising prompts when the generated output did not match the requirements.


One example of an AI mistake occurred during the implementation of search functionality. The generated implementation used `toLowerCase()` to process search keywords. Although this is useful for English case-insensitive searches, it is unnecessary for Khmer. I identified the issue while reviewing the AI's output summary and corrected the implementation.


Another example occurred during security development, when AI suggested adding database policies without first checking whether equivalent policies already existed. Reviewing the existing database policies helped identify the duplication before applying unnecessary SQL changes.


The final implementation remains the developer's responsibility. AI assisted with development, but decisions about functionality, security, design, and acceptance of generated code were reviewed by the developer.


## 6. Sources and Credits


The archive is built around personal memories and experiences connected to Pochentong Airport.


The original collection includes contributions from people with different perspectives, including travelers, former airport visitors, families, and people with aviation-related experiences.


### Contributors and Sources


The development records identify the following contributors:


| Contributor            | Entry / Experience                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Lyching Kong           | Personal memories and experiences connected to Pochentong Airport.                                               |
| Puthea Chamnan         | Personal airport memories.                                                                                       |
| Seilakeo Kan           | From the Tower: Seeing Pochentong from Above — an internship experience at Cambodia Air Traffic Services (CATS). |
| Kimseng Touch          | Family farewell and airport restaurant memories, June 2015.                                                      |
| Pich Chanmunyneath Mak | Memories of a crowded morning before a trip to Singapore, May 2023.                                              |
| Daravan Bun            | Childhood memories of the airport arrival gate, around 2018.                                                     |
| Jojo                   | Nostalgia and ordinary moments at the former airport, around 2023.                                               |


**Source permissions and image credits:** Confirmed the permission and attribution details for every published entry before submission. Add the original source of each photograph where it was not taken by the contributor. Do not assume that a contributor's name automatically grants permission to publish their story or photographs.


## 7. Running It Locally


### Prerequisites


- Node.js (compatible with the project's Next.js version).
- npm.
- A Supabase project.
- Git.


### Clone the Repository


```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <PROJECT_FOLDER>
```


### Install Dependencies


```bash
npm install
```


### Environment Variables


Create a `.env.local` file in the project root and configure the required Supabase environment variables:


```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_key
```


Use the exact variable names expected by the project's Supabase client configuration. Never commit actual credentials or secret keys.


The Supabase publishable key is intended to be exposed to the browser. It does not grant unrestricted database access; RLS policies and database functions enforce permissions.


**Never expose a Supabase secret/service-role key in frontend code or commit it to the repository.**


### Run the Development Server


```bash
npm run dev
```


Open the application at:


```text
http://localhost:3000
```


### Production Build


```bash
npm run build
npm start
```


The application is deployed through Vercel, with Supabase providing authentication, database, and storage services.


## 8. Submission Checklist


- [x] Live URL loads logged out and shows published entries only: **YES**, (https://pochentong-airport-archive.vercel.app/)
- [x] A stranger cannot publish their own entry through the page or the console: **YES**, last tested Sunday, 22 Nov 2026
- [x] Logged out, the API returns nothing pending or returned: **YES**, last tested Sunday, 22 Nov 2026
- [x] Contributors can edit and delete only their own entries: **YES**
- [x] No secrets anywhere in the repo history: **YES**, checked with Gitleaks (gitleaks git . --log-opts="--all")
- [x] At least eight real entries, each with a credited source: **YES**, [COUNT: 8]
- [x] Khmer renders on every screen a user meets, including the queue: **YES**
- [x] Works at phone width: **YES** tested on Chrome DevTools responsive mode at 375px, 390px, and 412px viewport widths & Iphone 16 PM
- [x] No test entries, lorem ipsum, or TODO comments in shipped pages: **YES**
- [x] No console errors on the main pages: **YES**
- [x] jesseorndorff is a collaborator on this repository: **YES**
- [x] Supabase project restored and awake on: **Sunday, 22 Nov 2026**
- [x] Demo video link opens in a private window: **YES,** (https://youtu.be/tDEsZI6kAWY)
- [x] Reflection pasted in the Canvas submission: **YES**
- [x] Posted in the Show Your Archive discussion: **YES**
- [x] Q&A slot booked for: **Friday, 27 Nov 2026 - 8:30AM**



