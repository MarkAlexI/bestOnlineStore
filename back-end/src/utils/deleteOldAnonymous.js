import User from '../models/userSchema.js';
import logger from './logger.js';

const deleteOldAnonymous = async () => {
  const manyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 60));

  try {
    const result = await User.deleteMany({
      isAnonymous: true,
      Timestamp: { $lte: manyDaysAgo },
    });

    logger.info(`${result.deletedCount} anonymous users deleted.`);
  } catch (error) {
    logger.error('Error deleting of anonymous users:', error);
  }

  return;
};

export default deleteOldAnonymous;
