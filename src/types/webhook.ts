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
  image: {
    mime_type: string;
    sha256: string;
    id: string;
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

export type IDB = {
  greeting: IText;
  // main: IInteractiveList;
  support: IText;
  main: IInteractiveButton;
  continue: IInteractiveButton;
  bye: IText;
  didNotDisplayPayment: IInteractiveList;
  visualizePaymentZelle: IText;
  visualizePaymentMobile: IText;
  resolveDoubt: IInteractiveButton;
  resolveDoubtPaymentMobile: IInteractiveButton;
  resolveDoubtZelle: IInteractiveButton;
  otherBank: IText;
  typeBank: IInteractiveList;
  validatePayment: IText;
  form: {
    paymentMobile: {
      locator: IText;
      reference: IText;
      amount: IText;
      issuerNumber: IText;
      bank: IText;
      uri: IText;
    };
    zelle: {
      locator: IText;
      reference: IText;
      amount: IText;
      uri: IText;
    };
    other: {
      uri: IText;
      description: IText;
    };
  };
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
};
