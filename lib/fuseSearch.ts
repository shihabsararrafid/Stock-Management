import Fuse from 'fuse.js'

export const FuseSearch = (list: any, fuseOptions: any, search: string) => {
  const fuse = new Fuse(list, fuseOptions)
  //   console.log(fuse, 'ssss')
  // Change the pattern

  return fuse.search(search)
}
