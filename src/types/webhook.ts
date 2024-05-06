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

type IFunctionConfirmItem = {
  vars: string[];
  smps: string[];
  data: string[];
};

type IFunctionConfirm = {
  [name: string]: IFunctionConfirmItem;
};

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
  greeting: IText;
  // welcome: IInteractiveList;
  // response: {
  //   // ? Response 1 --> 11 --> 111
  //   res1: IInteractiveButton;
  //   res11: IInteractiveButton;
  //   res12: IText;
  //   res111: IText;
  //   res112: IText;
  //   //
  //   // ? Response 2 --> 22 --> 222
  //   res2: IInteractiveList;
  //   res21: IText;
  //   res22: IText;
  //   res23: IText;
  //   res24: IText;

  //   // ? Response 3 --> 33 --> 333
  //   res3: IText;

  //   // ? Form
  //   confirm: IText;
  // };
  // resolved3: IInteractiveButton;
  // continueConversation: IInteractiveButton;
  // goodBye: IText;
  form: {
    locator: IText;
    reference: IText;
    amount: IText;
  };
};
