import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';

export default class ProfileServicesCard extends Model {
  title = Model.attribute<string>('title');
  category = Model.attribute<string | null>('category');
  description = Model.attribute<string>('description');
  availability = Model.attribute<string>('availability');
  priceLabel = Model.attribute<string | null>('priceLabel');
  externalUrl = Model.attribute<string | null>('externalUrl');
  contactLabel = Model.attribute<string | null>('contactLabel');
  isPublic = Model.attribute<boolean>('isPublic');
  status = Model.attribute<string>('status');
  createdAt = Model.attribute<string | null>('createdAt');
  updatedAt = Model.attribute<string | null>('updatedAt');
  approvedAt = Model.attribute<string | null>('approvedAt');
  rejectedAt = Model.attribute<string | null>('rejectedAt');
  canEdit = Model.attribute<boolean>('canEdit');
  canDelete = Model.attribute<boolean>('canDelete');
  canModerate = Model.attribute<boolean>('canModerate');
  user = Model.hasOne<User>('user');
  approvedBy = Model.hasOne<User>('approvedBy');
  rejectedBy = Model.hasOne<User>('rejectedBy');
}
