import { JSONSchemaType } from "ajv";

export interface EmployeeJson {
  id: number;
  name: string;
  last_name: string;
}

export interface GroupTrainingCategoryJson {
  id: number;
  name: string;
  color: string;
  is_smart_start: boolean;
}

export interface GroupTrainingJson {
  id: number;
  name: string;
  group_training_category: GroupTrainingCategoryJson;
  description: string;
  intensity: number;
  short_desc: string;
  total_duration: number;
}

export interface ClubJson {
  id: number;
  name: string;
  short_name: string;
}

export interface ClubZonesJson {
  id: number;
  name: string;
  description: string;
}

export interface UserJson {
  id: number;
  first_name: string;
  last_name: string;
  booking_status: string;
  photo_url: string;
}

export interface TrainingDataJson {
  id: number;
  is_payable: boolean;
  start_time: string;
  end_time: string;
  free_seats: number;
  count_seats: number;
  queue_available: boolean;
  parent_id: number;
  booking_start_at: string;
  booking_end_at: string;
  employee: EmployeeJson[];
  group_training: GroupTrainingJson;
  club: ClubJson;
  club_zone: ClubZonesJson;
  users: UserJson[];
  club_start_time: string;
  club_end_time: string;
}

export interface GetGroupTrainingTimeTableResponseJson {
  session_id: string;
  request_id: string;
  data: TrainingDataJson[];
}

// Схемы для вложенных объектов
export const employeeJsonSchema: JSONSchemaType<EmployeeJson> = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    last_name: { type: "string" }
  },
  required: ["id", "name", "last_name"],
  additionalProperties: false
};

export const groupTrainingCategoryJsonSchema: JSONSchemaType<GroupTrainingCategoryJson> = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    color: { type: "string" },
    is_smart_start: { type: "boolean" }
  },
  required: ["id", "name", "color", "is_smart_start"],
  additionalProperties: false
};

export const groupTrainingJsonSchema: JSONSchemaType<GroupTrainingJson> = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    group_training_category: groupTrainingCategoryJsonSchema,
    description: { type: "string" },
    intensity: { type: "number" },
    short_desc: { type: "string" },
    total_duration: { type: "number" }
  },
  required: [
    "id",
    "name",
    "group_training_category",
    "description",
    "intensity",
    "total_duration"
  ],
  additionalProperties: false
};

export const clubJsonSchema: JSONSchemaType<ClubJson> = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    short_name: { type: "string" }
  },
  required: ["id", "name", "short_name"],
  additionalProperties: false
};

export const clubZonesJsonSchema: JSONSchemaType<ClubZonesJson> = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    description: { type: "string" }
  },
  required: ["id", "name", "description"],
  additionalProperties: false
};

export const userJsonSchema: JSONSchemaType<UserJson> = {
  type: "object",
  properties: {
    id: { type: "number" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    booking_status: { type: "string" },
    photo_url: { type: "string" }
  },
  required: ["id", "first_name", "last_name", "booking_status", "photo_url"],
  additionalProperties: false
};

export const trainingDataJsonSchema: JSONSchemaType<TrainingDataJson> = {
  type: "object",
  properties: {
    id: { type: "number" },
    is_payable: { type: "boolean" },
    start_time: { type: "string" },
    end_time: { type: "string" },
    free_seats: { type: "number" },
    count_seats: { type: "number" },
    queue_available: { type: "boolean" },
    parent_id: { type: "number" },
    booking_start_at: { type: "string" },
    booking_end_at: { type: "string" },
    employee: {
      type: "array",
      items: employeeJsonSchema
    },
    group_training: groupTrainingJsonSchema,
    club: clubJsonSchema,
    club_zone: clubZonesJsonSchema,
    users: {
      type: "array",
      items: userJsonSchema
    },
    club_start_time: { type: "string" },
    club_end_time: { type: "string" }
  },
  required: [
    "id",
    "is_payable",
    "start_time",
    "end_time",
    "free_seats",
    "count_seats",
    "queue_available",
    "booking_start_at",
    "booking_end_at",
    "employee",
    "group_training",
    "club",
    "club_zone",
    "club_start_time",
    "club_end_time"
  ],
  additionalProperties: false
};

export const getGroupTrainingTimeTableJsonSchema: JSONSchemaType<GetGroupTrainingTimeTableResponseJson> = {
  type: "object",
  properties: {
    session_id: { type: "string" },
    request_id: { type: "string" },
    data: {
      type: "array",
      items: trainingDataJsonSchema
    }
  },
  required: ["session_id", "request_id", "data"],
  additionalProperties: false
};