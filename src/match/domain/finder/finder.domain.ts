import { BadRequestException } from '@nestjs/common';
import { Gender } from '../match/gender.domain';
import { IProfile } from '../profile/profile.domain';
import { IProfileRepository } from '../profile/profile.repository';

/** Clase base para estrategias de búsqueda */
export abstract class Finder {
    protected args: Record<string, any>;

    constructor(args: Record<string, any> = {}) {
        this.args = args;
    }

    protected getArg<T>(key: string, defaultValue?: T): T {
        if (!(key in this.args) && defaultValue === undefined) {
            throw new Error(`Falta el parámetro '${key}' en ${this.constructor.name}.`);
        }
        return (this.args[key] ?? defaultValue) as T;
    }

    abstract find(): Promise<IProfile[]>;
}

/** Estrategia para traer todos los perfiles */
export class AllStrategy extends Finder {
    async find(): Promise<IProfile[]> {
        try {
            const profileRepo = this.getArg<IProfileRepository>('profileRepo');
            return await profileRepo.getProfileByFilter({});
        } catch (error) {
            throw new Error(
                `Error en la estrategia 'AllStrategy': ${(error as Error).message}`,
            );
        }
    }
}

/** Estrategia para buscar por género */
export class GenderStrategy extends Finder {
    async find(): Promise<IProfile[]> {
        try {
            const profileRepo = this.getArg<IProfileRepository>('profileRepo');
            const genders = this.getArg<Gender[]>('genders');

            if (!genders || genders.length === 0) {
                throw new BadRequestException(
                    'El parámetro "genders" no puede estar vacío.',
                );
            }

            return await profileRepo.getProfileByFilter({
                gender: genders as string[], // Especificamos que 'genders' será un array de strings
            });
        } catch (error) {
            throw new Error(
                `Error en la estrategia 'GenderStrategy':${(error as Error).message}`,
            );
        }
    }
}

/** Contexto que maneja la estrategia actual */
export class ContextFinder {
    private finderStrategy?: Finder;

    setFinderStrategy(strategy: Finder): void {
        this.finderStrategy = strategy;
    }

    async findProfile(): Promise<IProfile[]> {
        if (!this.finderStrategy) {
            throw new Error('No se ha definido una estrategia de búsqueda.');
        }
        try {
            return await this.finderStrategy.find();
        } catch (error) {
            throw new BadRequestException(
                `Error en la ejecución de la estrategia de búsqueda: ${(error as Error).message}`,
            );
        }
    }
}

/** Fábrica que crea y almacena estrategias al inicializar */
export class FactoryStrategy {
    private strategies: Map<string, Finder> = new Map();

    constructor(profileRepo: IProfileRepository, args: Record<string, any> = {}) {
        try {
            this.strategies.set('all', new AllStrategy({ profileRepo }));
            this.strategies.set('gender', new GenderStrategy({ profileRepo, ...args }));
        } catch (error) {
            throw new Error(
                `Error al inicializar FactoryStrategy:${(error as Error).message}`,
            );
        }
    }

    /** Obtiene una estrategia ya instanciada */
    getStrategy(name: string): Finder | Error {
        const strategy = this.strategies.get(name);
        if (!strategy) {
            throw new Error(`Estrategia "${name}" no está registrada.`);
        }
        return strategy;
    }
}
