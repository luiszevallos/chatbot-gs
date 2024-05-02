export type IContact = {
  profile: {
    name: string;
  };
  wa_id: string;
};

export type IMessage = {
  from: string;
  id: string;
  timestamp: string;
  text: {
    body: string;
  };
  type: string;
  interactive?: {
    type: string;
    button_reply?: {
      id: string;
      title: string;
    };
    list_reply?: {
      id: string;
      title: string;
    };
  };
};

export type IChange = {
  value: {
    messaging_product: string;
    metadata: {
      display_phone_number: string;
      phone_number_id: string;
    };
    contacts: IContact[];
    messages: IMessage[];
  };
  field: string;
};

export type IEntry = {
  id: string;
  changes: IChange[];
};

// TODO: type message

export type IRow = {
  id: string;
  title: string;
  description?: string;
};

export type ISection = {
  title?: string;
  rows: IRow[];
};

export type IButton = {
  type: string;
  reply: {
    id: string;
    title: string;
  };
};

export type IText = {
  message: string;
  type: string;
};

export type IInteractiveButton = {
  type: string;
  header?: {
    type: string;
    text: string;
  };
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  action: {
    buttons: IButton[];
  };
};

export type IInteractiveList = {
  type: string;
  header?: {
    type: string;
    text: string;
  };
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  action: {
    sections: ISection[];
    button: string;
  };
};

// TODO: db message

export type IDB = {
  welcome: IInteractiveList;
  response: {
    // ? Response 1 --> 11 --> 111
    "1": IInteractiveButton;
    "11": IInteractiveButton;
    "12": IText;
    "111": IText;
    //
    // ? Response 2 --> 22 --> 222
    "2": IInteractiveList;
    // ? Response 3 --> 33 --> 333
    "3": IInteractiveList;
  };
  continueConversation: IInteractiveButton;
  goodBye: IText;
};
