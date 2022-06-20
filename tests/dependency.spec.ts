import { Container, Filesystem } from '../src'

describe('Dependency', () => {
    describe('Container', () => {
        it('container should can set and get dependency', () => {
            const filesystem = new Filesystem();
            Container.set('filesystem', filesystem);

            const containerFs = Container.get('filesystem');

            expect(filesystem).toEqual(containerFs);
            expect(containerFs).toBeInstanceOf(Filesystem);
        })
    })
});
