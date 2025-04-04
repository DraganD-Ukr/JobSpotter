import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Settings keys
      settingsTitle: "Settings",
      darkModeToggle: "Dark Mode Toggle",
      darkMode: "Dark Mode",
      language: "Language",
      selectLanguage: "Select Language",

      // SearchJobPost keys
      searchJobsPlaceholder: "Search jobs by title...",
      search: "Search",
      listView: "List View",
      cardView: "Card View",
      showResults: "Show Results",
      filters: "Filters",
      tags: "Tags",
      selectATag: "Select a tag",
      location: "Location",
      enterAddressLatLng: "Enter address (lat,lng)",
      useCurrentLocation: "Use Current Location",
      usingCurrentLocation: "Using your current location",
      radiusKm: "Radius (km)",
      radius: "Radius",
      applyFilters: "Apply Filters",
      searchReturnedJobPosts: "Search returned {{count}} job posts",
      noJobPostsFound: "No job posts found",
      posted: "Posted",
      maxApplicants: "Max Applicants",
      distance: "Distance",
      description: "Description",
      tagsLabel: "Tags",
      jobStatus: "Job Status",
      open: "Open",
      assigned: "Assigned",
      inProgress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled",
      nA: "N/A",
      applicantStatus: "Applicant Status",
      reportJobPost: "Report this job post",
      previous: "Previous",
      next: "Next",
      loading: "Loading...",
      failedToLoadJobTags: "Failed to load job tags.",
      geolocationNotSupported: "Geolocation is not supported by this browser.",
      failedToFetchUser: "Failed to fetch user info",
      failedToFetchAddresses: "Failed to fetch addresses",

      // Sort By keys
      sortBy: "Sort by:",
      datePostedOption: "Date Posted",
      lastUpdatedOption: "Last Updated",
      titleOption: "Title",
      statusOption: "Status",

      // Dynamic job post keys 
      jobTitle: "{{defaultValue}}",
      jobDescription: "{{defaultValue}}",

      // CreateJobPost
      createJobPost: "Create Job Post",
      availableTags: "Available Tags",
      selectedTags: "Selected Tags",
      selectAddress: "Select Address",
      selectAnAddress: "Select an address",
      creating: "Creating...",
      maxTagsAlert: "You can select up to 5 tags only.",
      noTagAlert: "Please add at least one tag.",
      loadingUser: "Loading user...",
      errorLoadingUser: "Error loading user. Please try again later.",
      jobPostCreated: "Job post created successfully!",
    },
  },
  fr: {
    translation: {

      // Settings keys
      settingsTitle: "Paramètres",
      darkModeToggle: "Basculer le mode sombre",
      darkMode: "Mode sombre",
      language: "Langue",
      selectLanguage: "Choisir la langue",

      // SearchJobPost keys
      searchJobsPlaceholder: "Recherchez des emplois par titre...",
      search: "Chercher",
      listView: "Vue Liste",
      cardView: "Vue Carte",
      showResults: "Afficher les résultats",
      filters: "Filtres",
      tags: "Étiquettes",
      selectATag: "Sélectionnez une étiquette",
      location: "Localisation",
      enterAddressLatLng: "Entrez l'adresse (lat,lng)",
      useCurrentLocation: "Utiliser la localisation actuelle",
      usingCurrentLocation: "Utilisation de votre localisation actuelle",
      radiusKm: "Rayon (km)",
      radius: "Rayon",
      applyFilters: "Appliquer les filtres",
      searchReturnedJobPosts: "{{count}} annonces d'emploi trouvées",
      noJobPostsFound: "Aucune annonce d'emploi trouvée",
      posted: "Publié",
      maxApplicants: "Nombre maximum de candidats",
      distance: "Distance",
      description: "Description",
      tagsLabel: "Étiquettes",
      jobStatus: "Statut de l'emploi",
      open: "Ouvert",
      assigned: "Assigné",
      inProgress: "En cours",
      completed: "Terminé",
      cancelled: "Annulé",
      nA: "N/A",
      applicantStatus: "Statut du candidat",
      reportJobPost: "Signaler cette annonce",
      previous: "Précédent",
      next: "Suivant",
      loading: "Chargement...",
      failedToLoadJobTags: "Échec du chargement des étiquettes d'emploi.",
      geolocationNotSupported: "La géolocalisation n'est pas prise en charge par ce navigateur.",
      failedToFetchUser: "Échec de la récupération des informations utilisateur",
      failedToFetchAddresses: "Échec de la récupération des adresses",

      // Sort By keys
      sortBy: "Trier par :",
      datePostedOption: "Date de publication",
      lastUpdatedOption: "Dernière mise à jour",
      titleOption: "Titre",
      statusOption: "Statut",

      // Dynamic job post keys
      jobTitle: "{{defaultValue}}",
      jobDescription: "{{defaultValue}}",

      // CreateJobPost
      createJobPost: "Créer une annonce d'emploi",
      availableTags: "Étiquettes disponibles",
      selectedTags: "Étiquettes sélectionnées",
      selectAddress: "Sélectionnez une adresse",
      selectAnAddress: "Sélectionnez une adresse",
      creating: "Création...",
      maxTagsAlert: "Vous pouvez sélectionner jusqu'à 5 étiquettes seulement.",
      noTagAlert: "Veuillez ajouter au moins une étiquette.",
      loadingUser: "Chargement de l'utilisateur...",
      errorLoadingUser: "Erreur lors du chargement de l'utilisateur. Veuillez réessayer plus tard.",
      jobPostCreated: "Annonce d'emploi créée avec succès !",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
