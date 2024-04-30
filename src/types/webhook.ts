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