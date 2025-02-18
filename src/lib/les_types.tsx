interface Subscription {
    id: number;
    type: string; // Ex: "Mensuel", "Annuel"
    startDate: string; // Date de début au format ISO (ex: "2023-01-01")
    endDate: string; // Date de fin au format ISO (ex: "2023-12-31")
  }
  
  interface Client {
    id: number;
    name: string;
    email: string;
    subscription: string; // Abonnement actuel
    phone?: string;
    address?: string;
    pastSubscriptions: Subscription[]; // Abonnements passés
  }

  interface Motif {
    id: number;
    motif: string;
    lien: string;
    prefecture : number;
  }
  
  interface PrefectureData {
    prefecture: string;
    indicatif: string;
    sousPref: string;
    motifs: Motif[];
  }

  interface PrefData {
    id: number;
    indicatif: string;
    created_at: string;
    prefecture: string;
    sousprefecture: string;
  }