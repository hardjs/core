import { Filesystem } from '../src'

it('should replace all', async () => {
    const filesystem = new Filesystem();
    expect(filesystem.replaceAll('home/admin/src', '/', '\\')).toBe('home\\admin\\src');
});

