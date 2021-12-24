import { Filesystem } from '../src'

describe('Filesystem', () => {
    let filesystem: Filesystem;

    beforeEach(() => {
        filesystem = new Filesystem();
    });

    describe('replaceAll', () => {
        it('should replace all', () => {
            expect(filesystem.replaceAll('home/admin/src', '/', '\\')).toBe('home\\admin\\src');
        });
    });
});
