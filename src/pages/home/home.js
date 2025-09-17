import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router";
import { isLoggedIn } from "../../utils/login";
import { Button, Input, InputGroup, Link, Tabs } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu";
import './home.css';

export function Home() {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [_, setSearchParams] = useSearchParams();
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
      // Login if not logged in, or login expired
      navigate("/login");
    }

    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('q');
    if (searchQuery) {
      setInput(searchQuery);
      setSearch(searchQuery);
    }
  }, []);

  const onSearch = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setSearch(trimmed);
    setSearchParams({ 'q': trimmed });
  }, [input]);

  const onInputKeyDown = useCallback((ev) => {
    if (ev.key === 'Enter') {
      onSearch();
    }
  }, [onSearch]);

  return (
    <main className="flex items-center justify-center pt-16 pb-4 flex-col">
      <div className="search">
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input placeholder="Search pokemon card" value={input} onChange={(ev) => setInput(ev.target.value)} onKeyDown={onInputKeyDown} />
        </InputGroup>
        <Button onClick={onSearch}>Go</Button>
      </div>
      
      {search ? (
        <Tabs.Root lazyMount defaultValue="tab-1">
          <Tabs.List>
            <Tabs.Trigger value="tab-1">Price charting</Tabs.Trigger>
            <Tabs.Trigger value="tab-2">Collectr</Tabs.Trigger>
            <Tabs.Trigger value="tab-3">TCG player</Tabs.Trigger>
            <Tabs.Trigger value="tab-4">eBay</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab-1">
            <iframe title="price charting" width="600px" height="1000px" src={`https://www.pricecharting.com/search-products?type=prices&q=${search}`}></iframe>
          </Tabs.Content>
          <Tabs.Content value="tab-2">
            <iframe title="collectr" width="600px" height="1000px" src={`https://app.getcollectr.com/?query=${search}`}></iframe>
          </Tabs.Content>
          <Tabs.Content value="tab-3">
            <Link href={`https://www.tcgplayer.com/search/all/product?q=${search}`} target="blank">
              https://www.tcgplayer.com/search/all/product?q={search}
            </Link>
          </Tabs.Content>
          <Tabs.Content value="tab-4">
            <Link href={`https://www.ebay.ca/sch/i.html?_nkw=${search}&_sacat=0&_from=R40&rt=nc&LH_Sold=1&LH_Complete=1`} target="blank">
              https://www.ebay.ca/sch/i.html?_nkw={search}&_sacat=0&_from=R40&rt=nc&LH_Sold=1&LH_Complete=1
            </Link>
          </Tabs.Content>
        </Tabs.Root>
      ) : null}
    </main>
  );
}
