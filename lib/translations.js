// Static UI copy (chrome text) for each supported language. Khmer values are
// placeholders to be replaced with real translations later.
export const uiText = {
  en: {
    kicker: "KHMER LIVING ARCHIVE",
    curatedByLabel: "CURATED BY",
    sourceLabel: "SOURCE",
    collectionSectionTitle: "The Collection",
    entryCountSingular: "entry",
    entryCountPlural: "entries",
    searchPlaceholder: "Search entries, contributors, tags...",
    clearSearchLabel: "Clear search",
    noResults: "No memories/stories found. Try a different keyword.",
    noResultsTitle: "No entries found",
    noResultsHint: "We couldn't find any entries that match your search.",
    noResultsAction: "Try a different keyword",
    backToHome: "← BACK TO HOMEPAGE",
    untitledEntry: "Untitled entry",
    footer:
      "Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall 2026. This archive is under construction all semester. Come back in December.",
    emailLabel: "Email",
    passwordLabel: "Password",
    loginButton: "Sign In",
    signupButton: "Create Account",
    login: "Sign In",
    signup: "Sign Up",
    invalidEmailOrPassword: "Invalid email or password",
    passwordMismatch: "Passwords do not match",
    confirmPassword: "Confirm Password",
    contributeButton: "+ Contribute",
    logOut: "Log Out",
    menuOpen: "Menu",
    menuClose: "Close menu",
    myEntries: "My Entries",
    // The /my-entries listing (heading, sort menu and entry cards).
    myEntriesDashboard: {
      subtitle: "A list of memories you've contributed to the archive.",
      sortLabel: "Sort entries",
      newest: "Newest First",
      oldest: "Oldest First",
      // The status badge on each card.
      status: {
        pending: "Pending Review",
        published: "Published",
        returned: "Returned",
      },
      // Beside the Returned badge when the reviewer left a note.
      noteHint: "Note from reviewer",
      // The note popup's link to the entry page.
      openEntry: "Open entry",
    },
    // On the entry page, only for the owner of a returned entry.
    entryReviewNote: {
      title: "Returned by a reviewer",
      label: "Reviewer's note",
      privacy: "Only you and the archive reviewers can see this note.",
      privacyReviewer:
        "Only the contributor and the archive reviewers can see this note.",
      // The note popup on /my-entries.
      kicker: "Returned for changes",
      signature: "Archive reviewer",
      // What the owner should do next (EntryNoteNextStep).
      nextTitle: "What's next?",
      nextText:
        "Edit your entry to make the changes above. Once you save, it goes back to the reviewers as Pending Review.",
      editButton: "Edit entry",
    },
    // The /my-entries page when the user has no entries yet.
    myEntriesEmpty: {
      titleLead: "Your Story",
      titleHighlight: "Starts Here",
      text: "You haven't shared a memory yet. A first flight, a farewell at the gate, a reunion in the arrivals hall: every story helps keep Pochentong Airport alive.",
      primary: "Share Your First Memory",
      secondary: "Explore the Archive",
      note: "It only takes a few minutes. A reviewer reads every memory before it's published.",
    },
    loadingEntries: "Loading entries...",
    welcomeLoading: "Gathering memories...",
    welcomeReady: "Ready for departure",
    welcomeStart: "Click to Start",
    welcomeSoundOn: "Sound on",
    welcomeSoundOff: "Sound off",
    welcomePlace: "Phnom Penh, Cambodia",
    signingIn: "Signing in...",
    loginWelcome: "Welcome back!",
    loginIntro:
      "Sign in to continue exploring & contributing memories from Phnom Penh's former international airport.",
    noAccount: "Don't have an account?",
    signupWelcome: "Create an account!",
    signupIntro:
      "Join our community to explore, contribute, and preserve memories of Pochentong Airport.",
    haveAccount: "Already have an account?",
    showPassword: "Show password",
    hidePassword: "Hide password",
    creatingAccount: "Creating account...",
    limitReached: {
      chars: "You've reached the {max}-character limit.",
      words: "You've reached the {max}-word limit.",
      tags: "You've reached the {max}-tag limit.",
      tagLength: "Each tag can be at most {max} characters.",
    },
    themeToDark: "Switch to dark mode",
    themeToLight: "Switch to light mode",
    contributeTitle: "Contribute an Entry",
    contributeKicker: "SHARE A MEMORY",
    contributeIntro:
      "Add your memory of Pochentong Airport to the archive. Write it in both English and Khmer so everyone can read it.",
    contributeLoginPrompt: "You need to be signed in to contribute an entry.",
    contributeLoginLink: "Sign in to contribute",
    // The /contribute landing page for visitors who are not signed in.
    contributeWelcome: {
      titleLead: "Every Memory Deserves to Be",
      titleHighlight: "Remembered.",
      intro:
        "Share your stories, photographs, and experiences of Pochentong Airport to help preserve its legacy for future generations.",
      signIn: "Sign In to Contribute",
    },
    submitEntry: "Submit Entry",
    // The /contribute screen after a new entry is saved.
    contributeSuccess: {
      kicker: "Submission received",
      titleLead: "Your Memory Has Been",
      titleHighlight: "Preserved!",
      text: "Thank you for sharing your story of Pochentong Airport. A reviewer will read it soon, and once it's approved it will appear in the archive for everyone to explore.",
      statusLabel: "Status",
      statusValue: "Pending Review",
      myEntries: "View My Entries",
      explore: "Explore the Archive",
    },
    statuses: {
      pending: "Waiting for review",
      published: "Published",
      returned: "Returned",
    },
    reviewLink: "Review",
    reviewTitle: "Entries Waiting for Review",
    reviewNotReviewer: "You don't have permission to access this page.",
    // The /review screen for visitors who are not reviewers.
    reviewRestricted: {
      titleLead: "This Area Is",
      titleHighlight: "Restricted.",
      text: "The review area is reserved for authorized archive reviewers. You can still explore memories and contribute your own stories.",
      archiveButton: "Back to Archive",
      contributeButton: "Share a Memory",
      // The boarding-pass card's labels.
      passTitle: "Review Pass",
      fromLabel: "From",
      toLabel: "To",
      toValue: "Review Area",
      gateLabel: "Gate",
      accessLabel: "Access",
      accessValue: "Reviewers only",
      stamp: "Access Denied",
      passengerLabel: "Passenger",
      passengerValue: "Visitor",
      boardingLabel: "Boarding",
      boardingValue: "Closed",
      classLabel: "Class",
      classValue: "Archive",
    },
    // The reviewer's /review page when nothing is waiting.
    reviewAllCaughtUp: {
      kicker: "Review queue",
      title: "All Caught Up!",
      text: "There are no memories waiting for review right now. New submissions will appear here when they're ready.",
      button: "Back to Archive",
      pendingLabel: "Pending",
      statusLabel: "Status",
      statusValue: "All clear",
    },
    reviewFailed:
      "This entry couldn't be updated. It may already have been reviewed. Refresh the page to see the latest.",
    // The reviewer's /review board (summary cards, status tabs, entry cards).
    reviewWorkspace: {
      kicker: "Review workspace",
      waitingLabel: "waiting",
      total: "Total Entries",
      published: "Published",
      pending: "Pending",
      returned: "Returned",
      all: "All Entries",
      filterLabel: "Filter by status",
      noneForFilter: "No entries here yet.",
      submitted: "Submitted",
      review: "Review",
      view: "View",
      close: "Close",
      storyLabel: "Story",
      tagsLabel: "Tags",
      decisionLabel: "Your decision",
      publishing: "Publishing...",
      returning: "Returning...",
      publishedNotice: "Published. It now appears in the archive.",
      returnedNotice: "Returned to the contributor.",
      photo: "Photo {n}",
    },
    publishEntry: "Publish",
    returnEntry: "Return",
    reviewNotePlaceholder: "Why is it being returned? (optional)",
    reviewerNoteLabel: "Reviewer's note:",
    editKicker: "EDIT YOUR MEMORY",
    editTitle: "Edit Entry",
    editIntro:
      "Update your memory. Your changes appear in the archive as soon as you save.",
    saveChanges: "Save Changes",
    savingChanges: "Saving changes...",
    keepPhotoNote: "Leave the photo as it is to keep the current one.",
    editEntry: "Edit",
    deleteEntry: "Delete",
    deleteConfirm: "Delete this entry? This can't be undone.",
    deleteYes: "Yes, delete",
    deleting: "Deleting...",
    cancel: "Cancel",
    exhibit: {
      dateLabel: "Added to the archive",
      viewPhoto: "View the full photo",
      closePhoto: "Close photo",
    },
    submittingEntry: "Saving your entry...",
    requiredNote: "Fields marked * are required.",
    optional: "Optional",
    langEnglish: "English",
    langKhmer: "Khmer",
    counterUnits: { chars: "", words: "words", tags: "tags" },
    dropTitle: "Choose a photo",
    dropHint: "or drag and drop it here",
    changePhoto: "Change photo",
    removePhoto: "Remove",
    sections: {
      images: {
        title: "Photo",
        hint: "One JPG, PNG, or WebP image, up to 4 MB. It becomes the cover of your entry.",
      },
      title: { title: "Title", hint: "A short name for your memory." },
      description: {
        title: "Description",
        hint: "One or two sentences. This is shown on the archive card.",
      },
      story: {
        title: "Story",
        hint: "Tell the full memory. Leave a blank line between paragraphs.",
      },
      tags: {
        title: "Tags",
        hint: "Up to 6 words that help people find your entry, separated by commas.",
      },
      contributor: {
        title: "Contributor",
        hint: "The name shown on your entry. Leave it blank if you'd rather not be named.",
      },
    },
    fieldErrors: {
      required: "This field is required.",
      onlySpaces: "Remove the spaces or leave this field empty.",
      tooLongChars: "Too long. Use at most {max} characters.",
      tooLongWords: "Too long. Use at most {max} words.",
      onlyCommas: "Enter at least one tag, or leave this field empty.",
      tooManyTags: "Use at most {max} tags.",
      tagTooLong: "Each tag can be at most {max} characters.",
      duplicateTag: "Remove the duplicate tag.",
      imageRequired: "Choose a photo to upload.",
      imageTooLarge: "This photo is too large. Choose one under {max} MB.",
      imageType: "Use a JPG, PNG, or WebP photo.",
      imageInvalid: "This file isn't a valid image. Choose another photo.",
    },
    submitErrors: {
      invalid: "Please fix the highlighted fields.",
      notSignedIn: "Your session has ended. Please sign in again.",
      badRequest: "Something went wrong sending the form. Please try again.",
      uploadFailed: "The photo couldn't be uploaded. Please try again.",
      saveFailed: "Your entry couldn't be saved. Please try again.",
      notSaved: "That change wasn't saved.",
      network:
        "Couldn't reach the archive. Check your connection and try again.",
    },
  },
  km: {
    kicker: "បណ្ណសាររស់នៃកម្ពុជា",
    curatedByLabel: "រៀបចំដោយ",
    sourceLabel: "ប្រភព",
    collectionSectionTitle: "បណ្តុំប្រមូលផ្តុំ",
    entryCountSingular: "កំណត់ត្រា",
    entryCountPlural: "កំណត់ត្រា",
    searchPlaceholder: "ស្វែងរកតាម កំណត់ត្រា អ្នកចូលរួមចំណែក ស្លាក...",
    clearSearchLabel: "លុបការស្វែងរក",
    noResults: "រកមិនឃើញកំណត់ត្រា/រឿងរ៉ាវទេ។ សូមល្បងពាក្យគន្លឹះផ្សេង។",
    noResultsTitle: "រកមិនឃើញកំណត់ត្រា",
    noResultsHint: "យើងរកមិនឃើញកំណត់ត្រាដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។",
    noResultsAction: "សាកល្បងពាក្យគន្លឹះផ្សេង",
    backToHome: "← ត្រឡប់ទៅទំព័រដើម",
    untitledEntry: "កំណត់ត្រាគ្មានចំណងជើង",
    footer:
      "បង្កើតឡើងក្នុងមុខវិជ្ជា ICT 340 — Vibe Coding នៅសាកលវិទ្យាល័យអាមេរិកាំងភ្នំពេញ (AUPP) ឆមាសរដូវស្លឹកឈើជ្រុះ ឆ្នាំ២០២៦។ បណ្ណសារនេះកំពុងស្ថិតក្នុងការអភិវឌ្ឍពេញមួយឆមាស។ សូមត្រឡប់មកពិនិត្យឡើងវិញនៅខែធ្នូ។",
    emailLabel: "អ៊ីមែល",
    passwordLabel: "ពាក្យសម្ងាត់",
    loginButton: "ចូលគណនី",
    signupButton: "បង្កើតគណនី",
    login: "ចូលគណនី",
    signup: "ចុះឈ្មោះ",
    invalidEmailOrPassword: "អ៊ីមែល ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវ",
    passwordMismatch: "ពាក្យសម្ងាត់មិនត្រូវគ្នា",
    confirmPassword: "បញ្ជាក់ពាក្យសម្ងាត់",
    contributeButton: "+ ចែករំលែក",
    logOut: "ចាកចេញ",
    menuOpen: "ម៉ឺនុយ",
    menuClose: "បិទម៉ឺនុយ",
    myEntries: "កំណត់ត្រារបស់ខ្ញុំ",
    myEntriesDashboard: {
      subtitle: "បញ្ជីការចងចាំដែលអ្នកបានចូលរួមចែករំលែកទៅក្នុងបណ្ណសារ។",
      sortLabel: "តម្រៀបកំណត់ត្រា",
      newest: "ថ្មីបំផុតមុន",
      oldest: "ចាស់បំផុតមុន",
      status: {
        pending: "កំពុងរង់ចាំការពិនិត្យ",
        published: "បានផ្សព្វផ្សាយ",
        returned: "បានបញ្ជូនត្រឡប់",
      },
      noteHint: "មានកំណត់សម្គាល់ពីអ្នកពិនិត្យ",
      openEntry: "បើកកំណត់ត្រា",
    },
    entryReviewNote: {
      title: "បានបញ្ជូនត្រឡប់ដោយអ្នកពិនិត្យ",
      label: "កំណត់សម្គាល់ពីអ្នកពិនិត្យ",
      privacy:
        "មានតែអ្នក និងអ្នកពិនិត្យបណ្ណសារប៉ុណ្ណោះដែលអាចមើលឃើញកំណត់សម្គាល់នេះ។",
      privacyReviewer:
        "មានតែអ្នកចូលរួម និងអ្នកពិនិត្យបណ្ណសារប៉ុណ្ណោះដែលអាចមើលឃើញកំណត់សម្គាល់នេះ។",
      kicker: "ត្រូវការកែសម្រួល",
      signature: "អ្នកពិនិត្យបណ្ណសារ",
      nextTitle: "តើត្រូវធ្វើអ្វីបន្ទាប់?",
      nextText:
        "សូមកែសម្រួលកំណត់ត្រារបស់អ្នកតាមកំណត់សម្គាល់ខាងលើ។ ពេលអ្នករក្សាទុក វានឹងត្រូវបញ្ជូនទៅអ្នកពិនិត្យម្តងទៀត ក្នុងស្ថានភាពកំពុងរង់ចាំការពិនិត្យ។",
      editButton: "កែសម្រួលកំណត់ត្រា",
    },
    myEntriesEmpty: {
      titleLead: "រឿងរ៉ាវរបស់អ្នក",
      titleHighlight: "ចាប់ផ្តើមនៅទីនេះ",
      text: "អ្នកមិនទាន់បានចែករំលែកការចងចាំណាមួយនៅឡើយទេ។ មិនថាជាជើងហោះហើរដំបូង ការលាគ្នានៅច្រកចេញ ឬការជួបជុំគ្នាវិញនៅសាលអ្នកមកដល់ រឿងរ៉ាវនីមួយៗជួយរក្សាអាកាសយានដ្ឋានពោធិ៍ចិនតុងឱ្យនៅរស់រវើក។",
      primary: "ចែករំលែកការចងចាំដំបូងរបស់អ្នក",
      secondary: "រុករកបណ្ណសារ",
      note: "ចំណាយពេលតែប៉ុន្មាននាទីប៉ុណ្ណោះ។ អ្នកត្រួតពិនិត្យនឹងអានការចងចាំនីមួយៗ មុនពេលផ្សព្វផ្សាយ។",
    },
    loadingEntries: "កំពុងផ្ទុកកំណត់ត្រា...",
    welcomeLoading: "កំពុងប្រមូលផ្ដុំអនុស្សាវរីយ៍...",
    welcomeReady: "ត្រៀមខ្លួនចេញដំណើរ",
    welcomeStart: "ចុចដើម្បីចាប់ផ្ដើម",
    welcomeSoundOn: "បើកសំឡេង",
    welcomeSoundOff: "បិទសំឡេង",
    welcomePlace: "ភ្នំពេញ កម្ពុជា",
    signingIn: "កំពុងចូល...",
    loginWelcome: "សូមស្វាគមន៍ការត្រឡប់មកវិញ!",
    loginIntro:
      "ចូលគណនី ដើម្បីបន្តស្វែងយល់ និងចូលរួមចែករំលែកការចងចាំនៃអតីតព្រលានយន្តហោះអន្តរជាតិភ្នំពេញ។",
    noAccount: "មិនទាន់មានគណនីមែនទេ?",
    signupWelcome: "បង្កើតគណនីថ្មី!",
    signupIntro:
      "ចូលរួមជាមួយសហគមន៍របស់យើង ដើម្បីស្វែងយល់ ចូលរួមចែករំលែក និងថែរក្សាការចងចាំនៃអាកាសយានដ្ឋានពោធិ៍ចិនតុង។",
    haveAccount: "មានគណនីរួចហើយមែនទេ?",
    showPassword: "បង្ហាញពាក្យសម្ងាត់",
    hidePassword: "លាក់ពាក្យសម្ងាត់",
    creatingAccount: "កំពុងបង្កើតគណនី...",
    limitReached: {
      chars: "ដល់ដែនកំណត់ {max} តួអក្សរហើយ។",
      words: "ដល់ដែនកំណត់ {max} ពាក្យហើយ។",
      tags: "ដល់ដែនកំណត់ {max} ស្លាកហើយ។",
      tagLength: "ស្លាកនីមួយៗមិនអាចលើស {max} តួអក្សរ។",
    },
    themeToDark: "ប្តូរទៅរបៀបងងឹត",
    themeToLight: "ប្តូរទៅរបៀបភ្លឺ",
    contributeTitle: "ចែករំលែកកំណត់ត្រា",
    contributeKicker: "ចែករំលែកការចងចាំ",
    contributeIntro:
      "បន្ថែមការចងចាំរបស់អ្នកអំពីអាកាសយានដ្ឋានពោធិ៍ចិនតុងទៅក្នុងបណ្ណសារ។ សូមសរសេរទាំងភាសាអង់គ្លេស និងភាសាខ្មែរ ដើម្បីឱ្យអ្នកគ្រប់គ្នាអាចអានបាន។",
    contributeLoginPrompt:
      "អ្នកត្រូវចូលក្នុងគណនីជាមុនសិន ដើម្បីចែករំលែកកំណត់ត្រា។",
    contributeLoginLink: "ចូលក្នុងគណនីដើម្បីចែករំលែក",
    contributeWelcome: {
      titleLead: "គ្រប់ការចងចាំ",
      titleHighlight: "សក្តិសមនឹងត្រូវបានចងចាំ។",
      intro:
        "ចែករំលែករឿងរ៉ាវ រូបថត និងបទពិសោធន៍របស់អ្នកអំពីអាកាសយានដ្ឋានពោធិ៍ចិនតុង ដើម្បីជួយថែរក្សាកេរដំណែលរបស់វាសម្រាប់មនុស្សជំនាន់ក្រោយ។",
      signIn: "ចូលគណនីដើម្បីចែករំលែក",
    },
    submitEntry: "បញ្ជូនកំណត់ត្រា",
    contributeSuccess: {
      kicker: "បានទទួលការដាក់ស្នើ",
      titleLead: "ការចងចាំរបស់អ្នក",
      titleHighlight: "ត្រូវបានរក្សាទុកហើយ!",
      text: "សូមអរគុណសម្រាប់ការចែករំលែករឿងរ៉ាវរបស់អ្នកអំពីអាកាសយានដ្ឋានពោធិ៍ចិនតុង។ អ្នកត្រួតពិនិត្យនឹងអានវាក្នុងពេលឆាប់ៗ ហើយនៅពេលដែលត្រូវបានអនុម័ត វានឹងបង្ហាញក្នុងបណ្ណសារសម្រាប់អ្នកគ្រប់គ្នា។",
      statusLabel: "ស្ថានភាព",
      statusValue: "កំពុងរង់ចាំការពិនិត្យ",
      myEntries: "មើលកំណត់ត្រារបស់ខ្ញុំ",
      explore: "រុករកបណ្ណសារ",
    },
    statuses: {
      pending: "រង់ចាំការពិនិត្យ",
      published: "បានផ្សព្វផ្សាយ",
      returned: "បានបញ្ជូនត្រឡប់មកវិញ",
    },
    reviewLink: "ពិនិត្យ",
    reviewTitle: "កំណត់ត្រាដែលរង់ចាំការពិនិត្យ",
    reviewNotReviewer: "អ្នកមិនមានសិទ្ធិចូលប្រើទំព័រនេះទេ។",
    reviewRestricted: {
      titleLead: "តំបន់នេះ",
      titleHighlight: "ត្រូវបានហាមឃាត់។",
      text: "តំបន់ត្រួតពិនិត្យនេះសម្រាប់តែអ្នកត្រួតពិនិត្យបណ្ណសារដែលមានការអនុញ្ញាតប៉ុណ្ណោះ។ អ្នកនៅតែអាចស្វែងយល់ពីការចងចាំ និងចែករំលែករឿងរ៉ាវផ្ទាល់ខ្លួនរបស់អ្នកបាន។",
      archiveButton: "ត្រឡប់ទៅបណ្ណសារ",
      contributeButton: "ចែករំលែកការចងចាំ",
      passTitle: "ប័ណ្ណត្រួតពិនិត្យ",
      fromLabel: "ពី",
      toLabel: "ទៅ",
      toValue: "តំបន់ត្រួតពិនិត្យ",
      gateLabel: "ច្រក",
      accessLabel: "សិទ្ធិ",
      accessValue: "សម្រាប់អ្នកត្រួតពិនិត្យ",
      stamp: "មិនអនុញ្ញាត",
      passengerLabel: "អ្នកដំណើរ",
      passengerValue: "ភ្ញៀវ",
      boardingLabel: "ការឡើងយន្តហោះ",
      boardingValue: "បិទ",
      classLabel: "ថ្នាក់",
      classValue: "បណ្ណសារ",
    },
    reviewAllCaughtUp: {
      kicker: "ជួរត្រួតពិនិត្យ",
      title: "ពិនិត្យរួចរាល់ទាំងអស់!",
      text: "ពេលនេះមិនមានការចងចាំណាមួយកំពុងរង់ចាំការត្រួតពិនិត្យទេ។ ការដាក់ស្នើថ្មីៗនឹងបង្ហាញនៅទីនេះ នៅពេលដែលរួចរាល់។",
      button: "ត្រឡប់ទៅបណ្ណសារ",
      pendingLabel: "កំពុងរង់ចាំ",
      statusLabel: "ស្ថានភាព",
      statusValue: "គ្មានការរង់ចាំ",
    },
    reviewFailed:
      "មិនអាចធ្វើបច្ចុប្បន្នភាពកំណត់ត្រានេះបានទេ។ កំណត់ត្រានេះអាចត្រូវបានពិនិត្យរួចហើយ។ សូមផ្ទុកទំព័រឡើងវិញ ដើម្បីមើលទិន្នន័យចុងក្រោយ។",
    reviewWorkspace: {
      kicker: "កន្លែងត្រួតពិនិត្យ",
      waitingLabel: "កំពុងរង់ចាំ",
      total: "កំណត់ត្រាសរុប",
      published: "បានផ្សព្វផ្សាយ",
      pending: "កំពុងរង់ចាំ",
      returned: "បានបញ្ជូនត្រឡប់",
      all: "កំណត់ត្រាទាំងអស់",
      filterLabel: "ត្រងតាមស្ថានភាព",
      noneForFilter: "មិនទាន់មានកំណត់ត្រានៅទីនេះទេ។",
      submitted: "បានដាក់ស្នើ",
      review: "ពិនិត្យ",
      view: "មើល",
      close: "បិទ",
      storyLabel: "រឿងរ៉ាវ",
      tagsLabel: "ស្លាក",
      decisionLabel: "ការសម្រេចចិត្តរបស់អ្នក",
      publishing: "កំពុងបោះពុម្ពផ្សាយ...",
      returning: "កំពុងបញ្ជូនត្រឡប់...",
      publishedNotice: "បានបោះពុម្ពផ្សាយ។ ឥឡូវនេះវាបង្ហាញក្នុងបណ្ណសារហើយ។",
      returnedNotice: "បានបញ្ជូនត្រឡប់ទៅអ្នកចូលរួមវិញ។",
      photo: "រូបថតទី {n}",
    },
    publishEntry: "បោះពុម្ពផ្សាយ",
    returnEntry: "ផ្ញើត្រឡប់ទៅវិញ",
    reviewNotePlaceholder: "មូលហេតុនៃការបញ្ជូនត្រឡប់មកវិញ (ស្រេចចិត្ត)",
    reviewerNoteLabel: "កំណត់សម្គាល់ពីអ្នកពិនិត្យ:",
    editKicker: "កែសម្រួលការចងចាំរបស់អ្នក",
    editTitle: "កែសម្រួលកំណត់ត្រា",
    editIntro:
      "ធ្វើបច្ចុប្បន្នភាពការចងចាំរបស់អ្នក។ ការផ្លាស់ប្តូរនឹងបង្ហាញក្នុងបណ្ណសារភ្លាមៗ បន្ទាប់ពីអ្នករក្សាទុក។",
    saveChanges: "រក្សាទុកការផ្លាស់ប្តូរ",
    savingChanges: "កំពុងរក្សាទុកការផ្លាស់ប្តូរ...",
    keepPhotoNote: "ទុករូបថតឱ្យនៅដដែល ប្រសិនបើចង់រក្សារូបថតបច្ចុប្បន្ន។",
    editEntry: "កែសម្រួល",
    deleteEntry: "លុប",
    deleteConfirm: "លុបកំណត់ត្រានេះមែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។",
    deleteYes: "បាទ/ចាស លុបចោល",
    deleting: "កំពុងលុប...",
    cancel: "បោះបង់",
    exhibit: {
      dateLabel: "បានបញ្ចូលក្នុងបណ្ណសារ",
      viewPhoto: "មើលរូបថតពេញ",
      closePhoto: "បិទរូបថត",
    },
    submittingEntry: "កំពុងរក្សាទុកកំណត់ត្រា...",
    requiredNote: "ប្រអប់ដែលមានសញ្ញា * ត្រូវតែបំពេញ។",
    optional: "មិនបង្ខំ",
    langEnglish: "ភាសាអង់គ្លេស",
    langKhmer: "ភាសាខ្មែរ",
    counterUnits: { chars: "", words: "ពាក្យ", tags: "ស្លាក" },
    dropTitle: "ជ្រើសរើសរូបថត",
    dropHint: "ឬអូសរូបថតមកដាក់ទីនេះ",
    changePhoto: "ប្តូររូបថត",
    removePhoto: "លុបចេញ",
    sections: {
      images: {
        title: "រូបថត",
        hint: "រូបភាពមួយប្រភេទ JPG, PNG ឬ WebP ទំហំមិនលើស 4 MB។ រូបនេះនឹងក្លាយជារូបគម្របនៃកំណត់ត្រារបស់អ្នក។",
      },
      title: { title: "ចំណងជើង", hint: "ឈ្មោះខ្លីសម្រាប់ការចងចាំរបស់អ្នក។" },
      description: {
        title: "សេចក្តីពិពណ៌នា",
        hint: "មួយ ឬពីរប្រយោគ។ វានឹងបង្ហាញនៅលើកាតក្នុងបណ្ណសារ។",
      },
      story: {
        title: "រឿងរ៉ាវ",
        hint: "រៀបរាប់ការចងចាំឱ្យបានពេញលេញ។ សូមទុកបន្ទាត់ទទេមួយរវាងកថាខណ្ឌនីមួយៗ។",
      },
      tags: {
        title: "ស្លាក",
        hint: "ពាក្យមិនលើស ៦ ដែលជួយឱ្យគេស្វែងរកកំណត់ត្រារបស់អ្នកឃើញ ដោយបំបែកដោយសញ្ញាក្បៀស (,)។",
      },
      contributor: {
        title: "អ្នកចូលរួម",
        hint: "ឈ្មោះដែលបង្ហាញនៅលើកំណត់ត្រារបស់អ្នក។ ទុកឱ្យនៅទទេ ប្រសិនបើអ្នកមិនចង់បង្ហាញឈ្មោះ។",
      },
    },
    fieldErrors: {
      required: "ត្រូវតែបំពេញប្រអប់នេះ។",
      onlySpaces: "សូមលុបដកឃ្លាចេញ ឬទុកប្រអប់នេះឱ្យនៅទទេ។",
      tooLongChars: "វែងពេក។ សូមប្រើមិនលើស {max} តួអក្សរ។",
      tooLongWords: "វែងពេក។ សូមប្រើមិនលើស {max} ពាក្យ។",
      onlyCommas: "សូមបញ្ចូលស្លាកយ៉ាងហោចណាស់មួយ ឬទុកប្រអប់នេះឱ្យនៅទទេ។",
      tooManyTags: "សូមប្រើស្លាកមិនលើស {max}។",
      tagTooLong: "ស្លាកនីមួយៗមិនអាចលើស {max} តួអក្សរ។",
      duplicateTag: "សូមលុបស្លាកដែលស្ទួនចេញ។",
      imageRequired: "សូមជ្រើសរើសរូបថតដើម្បីផ្ទុកឡើង។",
      imageTooLarge: "រូបថតនេះធំពេក។ សូមជ្រើសរើសរូបថតតូចជាង {max} MB។",
      imageType: "សូមប្រើរូបថតប្រភេទ JPG, PNG ឬ WebP។",
      imageInvalid:
        "ឯកសារនេះមិនមែនជារូបភាពត្រឹមត្រូវទេ។ សូមជ្រើសរើសរូបថតផ្សេង។",
    },
    submitErrors: {
      invalid: "សូមកែប្រអប់ដែលបានសម្គាល់។",
      notSignedIn: "វគ្គរបស់អ្នកបានផុតកំណត់។ សូមចូលក្នុងគណនីម្តងទៀត។",
      badRequest: "មានបញ្ហាក្នុងការបញ្ជូនទម្រង់។ សូមព្យាយាមម្តងទៀត។",
      uploadFailed: "មិនអាចផ្ទុករូបថតឡើងបានទេ។ សូមព្យាយាមម្តងទៀត។",
      saveFailed: "មិនអាចរក្សាទុកកំណត់ត្រារបស់អ្នកបានទេ។ សូមព្យាយាមម្តងទៀត។",
      notSaved: "ការផ្លាស់ប្តូរនោះមិនត្រូវបានរក្សាទុកទេ។",
      network:
        "មិនអាចភ្ជាប់ទៅបណ្ណសារបានទេ។ សូមពិនិត្យអ៊ីនធឺណិត ហើយព្យាយាមម្តងទៀត។",
    },
  },
};

// Khmer translations for the collection.config.js values shown on the homepage.
// collection.config.js itself stays English-only and untouched.
export const collectionText = {
  km: {
    name: "បណ្ណសារអាកាសយានដ្ឋានពោធិ៍ចិនតុង",
    // Khmer has no spaces between words, so the two title lines are set by hand.
    nameLines: ["បណ្ណសារអាកាស", "យានដ្ឋានពោធិ៍ចិនតុង"],
    description:
      "បណ្ណសារអាកាសយានដ្ឋានពោធិ៍ចិនតុង គឺជាបណ្ណសារឌីជីថលបែបសហគមន៍ ដែលជួយរក្សាទុកការចងចាំផ្ទាល់ខ្លួន រឿងរ៉ាវ រូបថត និងអនុស្សាវរីយ៍ផ្សេងៗ ទាក់ទងនឹងអតីតព្រលានយន្តហោះអន្តរជាតិភ្នំពេញ។",
    curator: "គង់ លីជីង",
    source:
      "ការចូលរួមចែករំលែកផ្ទាល់ពីសហគមន៍ អតីតបុគ្គលិកអាកាសយានដ្ឋាន អ្នកធ្វើដំណើរ ប្រជាជនក្នុងតំបន់ គ្រួសារ ព្រមទាំងឯកសារប្រវត្តិសាស្ត្រសាធារណៈ។",
  },
};

// Returns a single entry field in the given language, falling back to the
// English value when no translation exists yet (or the language is "en").
export function getLocalizedEntryField(entry, field, language) {
  if (language === "km") {
    const value = entry.translations?.km?.[field];
    if (value !== undefined) return value;
  }
  return entry[field];
}

// Turns a validation error like { code: "tooLongChars", max: 120 } into the
// message for the current language.
export function formatFieldError(t, error) {
  if (!error) return "";
  const template = t.fieldErrors[error.code] || t.fieldErrors.required;
  return template.replace("{max}", error.max ?? "");
}

// Example text shown inside each empty form field, taken from a real entry
// in this archive ("My First Ever Flight"). Each example is in the language
// its field expects, so it stays the same whichever UI language is chosen.
export const fieldPlaceholders = {
  title: "e.g. My First Ever Flight",
  title_km: "ឧ. ជើងហោះហើរដំបូងបង្អស់របស់ខ្ញុំ",
  description:
    "e.g. At 13, I left Cambodia for the first time, beginning a journey I would never forget.",
  description_km:
    "ឧ. កាលអាយុ ១៣ឆ្នំា ខ្ញុំបានចាកចេញពីប្រទេសកម្ពុជាជាលើកដំបូង ដោយចាប់ផ្តើមដំណើរដែលខ្ញុំមិនអាចបំភ្លេចបាន។",
  story:
    "e.g. In January 2018, when I was 13 years old, I took my very first flight from Pochentong International Airport…",
  story_km:
    "ឧ. នៅក្នុងខែមករា ឆ្នាំ២០១៨ នៅពេលដែលខ្ញុំមានអាយុ ១៣ឆ្នាំ ខ្ញុំបានជិះជើងហោះហើរដំបូងបង្អស់របស់ខ្ញុំចេញពីអាកាសយានដ្ឋានអន្តរជាតិពោធិ៍ចិនតុង…",
  tags: "e.g. First Flight, Singapore, Youth, School Trip",
  tags_km: "ឧ. ជើងហោះហើរដំបូង, សិង្ហបុរី, យុវជន, ដំណើរទស្សនកិច្ចសិក្សា",
  contributor: "e.g. Kong Lyching",
  contributor_km: "ឧ. គង់ លីជីង",
};
