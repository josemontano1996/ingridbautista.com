'use server';

import { mapDbMenutoDto } from '@/application/dto/MenuDto';
import { ServerErrorHandler } from '@/application/errors/Errors';
import { IMenuRepository } from '@/infrastructure/persistence/repositories/MenuRepository';

export const ServerGetMenu = async (context: {
  menuRepository: IMenuRepository;
}) => {
  try {
    const { menuRepository } = context;

    const dbMenu = await menuRepository.getMenu();

    if (!dbMenu) {
      return [];
    }

    return mapDbMenutoDto(dbMenu);
  } catch (error) {
    const errorInstance = new ServerErrorHandler(error);
    errorInstance.logError();
    throw new Error('Error getting menu');
  }
};
