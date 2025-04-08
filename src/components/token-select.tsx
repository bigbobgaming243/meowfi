
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Search, Check, ChevronDown } from "lucide-react";

export type Token = {
  symbol: string;
  name: string;
  address: string;
  logo?: string;
  balance?: string;
};

type TokenSelectProps = {
  tokens: Token[];
  selectedToken: Token | null;
  onSelectToken: (token: Token) => void;
  disabled?: boolean;
};

export function TokenSelect({
  tokens,
  selectedToken,
  onSelectToken,
  disabled = false,
}: TokenSelectProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredTokens = tokens.filter(token => 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          className="flex items-center justify-between w-full h-12 px-4 py-2 
                    border rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-all"
        >
          {selectedToken ? (
            <div className="flex items-center gap-2 truncate">
              {selectedToken.logo ? (
                <div className="flex-shrink-0 w-6 h-6 rounded-full overflow-hidden bg-background">
                  <img 
                    src={selectedToken.logo} 
                    alt={selectedToken.symbol} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex-shrink-0 w-6 h-6 rounded-full 
                               bg-primary-500/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-500">
                    {selectedToken.symbol.charAt(0)}
                  </span>
                </div>
              )}
              <span className="font-medium">{selectedToken.symbol}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">Select token</span>
          )}
          <ChevronDown size={16} className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[300px] p-0 backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-white/20 shadow-lg"
        align="start"
      >
        <div className="p-4 border-b border-border/40">
          <div className="text-base font-medium mb-3">Select Token</div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name or paste address"
              className="pl-10 pr-3 py-2 h-10 bg-secondary/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => (
              <div
                key={token.address}
                className={`flex items-center justify-between px-3 py-2 rounded-lg 
                           cursor-pointer hover:bg-secondary/50 transition-colors
                           ${selectedToken?.address === token.address ? 'bg-secondary/30' : ''}`}
                onClick={() => {
                  onSelectToken(token);
                  setSearchQuery("");
                }}
              >
                <div className="flex items-center gap-3">
                  {token.logo ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-background">
                      <img 
                        src={token.logo} 
                        alt={token.symbol} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-500/20 
                                   flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-500">
                        {token.symbol.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{token.symbol}</div>
                    <div className="text-xs text-muted-foreground">{token.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {token.balance && (
                    <span className="text-sm text-muted-foreground">{token.balance}</span>
                  )}
                  {selectedToken?.address === token.address && (
                    <Check className="w-4 h-4 text-primary-500" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              No tokens found
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
