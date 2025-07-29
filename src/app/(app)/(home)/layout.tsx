
import { Category } from '@/payload-types';
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SearchFilters } from "./search-filters";
import { CustomCategory } from "./types";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {

  const payload = await getPayload({
      config: configPromise,
    })

  const data = await payload.find({
    collection: 'categories',
    depth: 1, // This is important to get the subcategories as well
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  })

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category), // Because of depth: 1, we need to manually cast the docs to the correct type
      subcategories: undefined,
    })),
  }))

  return (
    <div className="flex flex-col min-h-screen">
        
        <Navbar />
        <SearchFilters data={formattedData} />

        <div className="flex-1 bg-[#f4f4f0]">
            {children}
        </div>
        
        <Footer />
    </div>
  );
}

export default Layout;