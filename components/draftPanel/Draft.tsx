import {
  EventTypes,
  GsiDraftMessage,
  useTetherMessageListener,
} from "@esportlayers/io";

import DraftInfo from "./DraftInfo";
import { ReactElement } from "react";
import TeamDraft from "./TeamDraft";

export default function Draft(): ReactElement | null {
  const { value: draft } = useTetherMessageListener<GsiDraftMessage>(
    EventTypes.gsi_draft
  ) || { value: null };

  if (draft) {
    return (
      <>
        <TeamDraft draft={draft.team2} />
        <DraftInfo />
        <TeamDraft draft={draft.team3} />
      </>
    );
  }

  return null;
}
