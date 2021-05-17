import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer.tsx";

const Tab4 = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Tab 1</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Tab 4</IonTitle>
        </IonToolbar>
      </IonHeader>
      <ExploreContainer name="Tab 4 page" />
    </IonContent>
  </IonPage>
);

export default Tab4;
