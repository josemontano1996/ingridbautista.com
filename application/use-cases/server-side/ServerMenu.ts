'use server';

import { MenuDto, mapDbMenutoDto } from '@/application/dto/MenuDto';
import { ServerErrorHandler } from '@/application/errors/Errors';
import { IMenuRepository } from '@/infrastructure/persistence/repositories/MenuRepository';

export type IServerGetMenu = (context: {
  menuRepository: IMenuRepository;
}) => Promise<MenuDto | undefined>;

export const ServerGetMenu: IServerGetMenu = async (context: {
  menuRepository: IMenuRepository;
}): Promise<MenuDto | undefined> => {
  try {
    const { menuRepository } = context;

    const dbMenu = await menuRepository.getMenu();

    if (!dbMenu) {
      throw new Error('No menu found');
    }

    return mapDbMenutoDto(dbMenu);
  } catch (error) {
    const errorInstance = new ServerErrorHandler(error);
    errorInstance.logError();

    return undefined;
  }
};
